//stateless functional component implemented:

class IndecisionApp extends React.Component {
    constructor(props){
        super(props);
        this.handlePick = this.handlePick.bind(this);
        this.handleDeleteOptions=this.handleDeleteOptions.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            options: []
        };
    }
    handleDeleteOptions(){
        this.setState(()=>{
            return {
                options: []
            };
        });
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

        this.setState((prevState) => {
            return{
                options: prevState.options.concat(option)
            };
        });
    }
    render() {
        const title = 'Indecision';
        const subtitle = 'Put your life in the hands of your computer';
        
        return(
            <div>
                <Header title={title}/>
                <Action 
                handlePick={this.handlePick}
                hasOptions={this.state.options.length > 0} 
                />
                <Options 
                    options={this.state.options} 
                    handleDeleteOptions={this.handleDeleteOptions}
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
            <h2>{props.subtitle}</h2>
    </div>
    );
}
const Action = (props) => {
    return(
        <div>
        <button 
            disabled={!props.hasOptions} 
            onClick={props.handlePick}
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
            {
                props.options.map((value) => <Option key={value} optionText={value}/> )
            } 
        </div>
    );
};

const Option = (props) => {
    return (
        <div>
            {props.optionText}
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
        //Trim() erases the leading and trailing spaces.
        const option = e.target.elements.input.value.trim();
        const error = this.props.handleAddOption(option);


        this.setState(()=>{
            return{ error };
        });
    }
    render(){
        return(
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleAddOption}>
                <input type="text" name="input" />
                <button>Add Option</button>
                </form>
            </div>
        );
    }
}



ReactDOM.render(<IndecisionApp />, document.getElementById('app'));