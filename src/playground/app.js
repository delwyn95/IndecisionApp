//Grab the add function from the add.js file in the utils folder
//grav react from react npm module 
// add (2,4)

class IndecisionApp extends React.Component {
    constructor(props){
        super(props);
        this.handlePick = this.handlePick.bind(this);
        this.handleDeleteOptions=this.handleDeleteOptions.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        this.state = {
            options: []
        };
    }
    componentDidMount() {
        try{
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);
            if(options){
                this.setState(()=> ({ options }))
            }
        } catch (e){
            //Do nothing at all
        }
    }
    componentDidUpdate(prevProps,prevState){
        if (prevState.options.length !== this.state.options.length){
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options',json);
        }
        
    }
    componentWillUnmount(){
        console.log('componentWillUnmount');
    }
    handleDeleteOptions(){
        this.setState(() => ( { options:[] } ));
    }
    // Setting it to False removes everything. Setting true, keeps it
    handleDeleteOption(optionToRemove){
        this.setState((prevState)=> ({
            options: prevState.options.filter((option)=> !(optionToRemove === option))
        }))
    }
    handlePick(){
        const randNum = Math.floor(Math.random() * this.state.options.length);
        const output = this.state.options[randNum];
        alert(output);
    }
    handleAddOption(option){
        if(!option){
            return 'Enter valid value to add item'
        } else if(this.state.options.indexOf(option) > -1 ){
            return 'This option already exists.'
        } 

        this.setState((prevState) => ({
            options: prevState.options.concat(option),

        }));
    }
    render() {

        const subtitle = 'Put your life in the hands of your computer';
        
        return(
            <div>
                <Header subtitle={subtitle}/>
                <Action 
                hasOptions={this.state.options.length > 0} 
                handlePick={this.handlePick}
                />
                <Options 
                    options={this.state.options} 
                    handleDeleteOptions={this.handleDeleteOptions}
                    handleDeleteOption={this.handleDeleteOption}
                />
                <AddOptions 
                handleAddOption={this.handleAddOption}
                /> 
            </div>
        );
    }
} 

const Header = (props) => {
    return(
        <div>
            <h1>{props.title}</h1>
            {props.subtitle && <h2>{props.subtitle}</h2>}
    </div>
    );
}

const Action = (props) => {
    return(
        <div>
        <button 
            onClick={props.handlePick}
            disabled={!props.hasOptions} 
        > 
        What Should I Do?
        </button>
    </div>
    );
}


// Render list below
const Options = (props) => {
    return(
        <div>
            <button onClick={props.handleDeleteOptions}>Remove All</button>
            {props.options.length === 0 && <p>Please add an option to get started!</p>} 
            {
                props.options.map((option) => (
                        <Option 
                        key={option} 
                        optionText={option}
                        handleDeleteOption={props.handleDeleteOption}
                    />
                ))
            } 
        </div>
    );
};

const Option = (props) => {
    return (
        <div>
            {props.optionText}
            <button 
                onClick={(e) => {
                    props.handleDeleteOption(props.optionText);
                }}
            >
                remove
            </button>
        </div>
    );
};

class AddOptions extends React.Component {
    constructor(props){
        super(props);
        this.handleAddOption=this.handleAddOption.bind(this);
        this.state = {
            error: undefined
        }
    }
    
    handleAddOption(e) {
        e.preventDefault();

        const option = e.target.elements.option.value.trim();
        const error = this.props.handleAddOption(option);

        this.setState(()=>({ error }));

        if (!error){
            e.target.elements.option.value = '';
        }
    }
    // onChangeText = (text) => {this.setState({name:})}
    render(){
        return(
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleAddOption}>
                <input type="text" name="option" />
                <button>Add Option</button>
                </form>
            </div>
        );
    }
}



ReactDOM.render(<IndecisionApp />, document.getElementById('app'));