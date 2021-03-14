import React, {Component} from 'react';
import Picker from 'react-mobile-picker';
import { setDailyGoal } from '../../../actions/profileActions'
import $ from 'jquery'
import { connect } from 'react-redux'

var classRef;
class DailyGoalPicker extends Component {
  constructor(props) {
    super(props);
    classRef = this;
    this.state = {
      valueGroups: {
        title: 'Mr.',
        firstName: 'Micheal',
        secondName: 'Jordan'
      }, 
      optionGroups: {
       
        daily_tasks: ['5 words', '10 words', '15 words','20 words', '25 words', '30 words',
        '35 words', '40 words', '45 words','50 words', '55 words', '60 words',
        '65 words', '70 words', '75 words','80 ords', '85 words', '90 words',
        '100 words', '125 words', '150 words','175 words', '200 words'],
      }
    };
  }
 
  // Update the value in response to user picking event
  handleChange = (name, value) => {
    $.when()
    .then(()=>{
        this.setState(({valueGroups}) => ({
            valueGroups: {
              ...valueGroups,
              [name]: value
            }
            
          }))
    })
    .then(()=>{
        // console.log(value)
        let daily_goal = parseInt(value.substring(0,value.length - 6))
        console.log(daily_goal)
        classRef.props.setDailyGoal(daily_goal)
        classRef.props.action()
    })
  };
 
  render() {
    const {optionGroups, valueGroups} = this.state;
 
    return (
      <Picker
        optionGroups={optionGroups}
        valueGroups={valueGroups}
        onChange={this.handleChange} />
    );
  }
}

function mapStateToProps(state, ownProps) {
  console.log('props')
  console.log(ownProps)
  return {
      mounted_unit_obj: state.profile.mounted_unit_obj,
      mounted_unit_name: state.profile.mounted_unit_obj
  }
}

export default connect(mapStateToProps, {setDailyGoal})((DailyGoalPicker));