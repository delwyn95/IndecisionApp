import React from 'react';

import AddOption from './AddOption';
import Options from './Options';
import Header from './Header';
import Action from './Action';
import OptionModal from './OptionModal';

class IndecisionApp extends React.Component {
    state = {
        options:[],
        selectedOption: undefined
    };

    handleDeleteOptions = () => {
        this.setState(() => ( { options:[] } ));
    };
    handleSelectedOption = () => {
        this.setState( () => ({ selectedOption: undefined }));
    };
    // Setting it to False removes. Setting true, keeps it
    handleDeleteOption = (optionToRemove) => {
        this.setState((prevState)=> ({
            options: prevState.options.filter((option)=> !(optionToRemove === option))
        }))
    };
    handlePick = () => {
        const randNum = Math.floor(Math.random() * this.state.options.length);
        const output = this.state.options[randNum];
        this.setState(() => ({ selectedOption: output }));
    };
    handleAddOption = (option) => {
        if(!option){
            return 'Enter valid value to add item'
        } else if(this.state.options.indexOf(option) > -1 ){
            return 'This option already exists.'
        } 

        this.setState((prevState) => ({
            options: prevState.options.concat(option),

        }));
    };
 
    componentDidMount = () => {
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
                <AddOption 
                handleAddOption={this.handleAddOption}
                />
                <OptionModal 
                    selectedOption={this.state.selectedOption}
                    handleSelectedOption={this.handleSelectedOption}
                /> 
            </div>
        );
    }
} 


export default IndecisionApp;