console.log('App.js is running');

const app = {
    title: 'Indecision App',
    subtitle: 'Gayake Gayake Gayake',
    options: []
};

const onFormSubmit = (e) => {
    e.preventDefault(); //stops full page refresh

    const option = e.target.elements.option.value;
    if (option){
        app.options.push(option);
        e.target.elements.option.value = '';
        render();

    }
};
const onclearAll = () => {
    app.options = [];
    render();
};
const onMakeDecision = () => {
    const randomNum = Math.floor(Math.random()*app.options.length);
    const option = app.options[randomNum];
    alert(option);
};

const appRoot = document.getElementById('app');

const render = () => {
    const template = (
        <div>
            <h1>{app.title}</h1>
            {app.subtitle && <p>{app.subtitle}</p>}
            <p>{(app.options && app.options.length>0) ? "Here are your options" : "No options" }</p>
            <p>{app.options.length}</p>
            <button disabled={!app.options.length} onClick={onMakeDecision}>What Should I do?</button>
            <button onClick={onclearAll}>Remove All</button>

            <ol>
                {
                    app.options.map((value) => <li key={value}>{value}</li> )
                }
            </ol>
            <form onSubmit={onFormSubmit}>
                <input type="text" name="option"/>
                <button>Add Option</button>
            </form>
        
        </div>
    );
    ReactDOM.render(template, appRoot)
};

render();