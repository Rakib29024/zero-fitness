import React, { useState, useEffect, useRef } from 'react'
import { supabase } from '../../helper/supabaseClient';
import { json, useNavigate } from 'react-router-dom';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFormSelect,
} from '@coreui/react'
import {
  cilSettings,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
import { CButton, CModal, CModalBody, CModalHeader, CModalTitle, CModalFooter } from '@coreui/react'
import moment from 'moment';
import { useStopwatch } from 'react-timer-hook';

const TaskPlusDropdown = () => {
  const [visibleGoal, setVisibleGoal] = useState(false)
  const [visibleAcivity, setVisibleAcivity] = useState(false)
  const [visibleWeight, setVisibleWeight] = useState(false)
  const [visibleMeal, setVisibleMeal] = useState(false)
  const [userId, setUserId] = useState(null);
  const [activities, setActivities] = useState([]);
  const [goalTypes, setGoalTypes] = useState([]);
  const [foods, setFoods] = useState([])
  const [foodOptions, setFoodOptions] = useState([])
  // const [selectedItems, setSelectedItems] = useState([]);
  const [mealInfo, setMealInfo] = useState([]);
  const [totalCalories, setTotalColories] = useState(0);
  const [isTimerUsed, setIsTimerUsed] = useState(1);

  useEffect(() => {
    fetchUserId();
    fetchActivities();
    fetchGoalTypes();
    fetchFoods()
  }, []);



  const navigate = useNavigate();

  const fetchUserId = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setUserId(user.id);
    } catch (error) {
      console.error('Error fetching user ID:', error.message);
    }
  };

  // goal start
  const fetchGoalTypes = async () => {
    try {
      const { data, error } = await supabase
        .from('goal_types')
        .select('id, name')
        .eq('status', 1);

      if (error) {
        throw error;
      }

      const formattedGoalTypes = data.map(goal => ({
        id: goal.name,
        name: goal.name.charAt(0).toUpperCase() + goal.name.slice(1)
      }));
      setGoalTypes(formattedGoalTypes || []);
    } catch (error) {
      console.error('Error fetching goals:', error.message);
    }
  };

  const inputTitle = useRef();
  const inputType = useRef();
  const inputStartAt = useRef();
  const inputGoalAmount = useRef();

  const handleCreateGoal = async () => {
    const title = inputTitle.current.value;
    const type = inputType.current.value;
    const start_at = moment().format('YYYY-MM-DD HH:mm');
    const goal_amount = inputGoalAmount.current.value;
    const userid = userId;

    const res = await supabase
      .from("goals")
      .insert({ title, type, start_at, goal_amount, user_id: userid })
      .select("*")
      .single();

    setVisibleGoal(false)

    navigate('/goals');
  };
  // goal end

  // activity start
  const fetchActivities = async () => {
    try {
      const { data, error } = await supabase
        .from('activities')
        .select('id, name')
        .eq('status', 1);

      if (error) {
        throw error;
      }

      const formattedActivities = data.map(activity => ({
        id: activity.id,
        name: activity.name.charAt(0).toUpperCase() + activity.name.slice(1)
      }));
      setActivities(formattedActivities || []);
    } catch (error) {
      console.error('Error fetching activities:', error.message);
    }
  };

  const inputActivityId = useRef();
  const inputActivityTitle = useRef();
  // const inputActivityAmount = useRef();
  // const inputActivityStartAt = useRef();
  // const inputActivityDistance = useRef();
  // const inputActivityEnergy = useRef();



  const handleCreateAcivity = async () => {
    try{
      if(totalSeconds == undefined || totalSeconds == 0){
        setIsTimerUsed(2);
        return;
      }
      setIsTimerUsed(3);

      const title = inputActivityTitle.current.value;
      const activity_id = inputActivityId.current.value;
      // const activity_amount = inputActivityAmount.current.value;
      // const start_at = inputActivityStartAt.current.value;
      const userid = userId;
      // const distance = inputActivityDistance.current.value;
      // const energy = inputActivityEnergy.current.value;

      const endTimestamp = moment();
      const startTimestamp = endTimestamp.clone().subtract(totalSeconds, 'seconds');

      const res = await supabase
        .from("activity_records")
        .insert({
          title,
          activity_id,
          start_at: startTimestamp.format('YYYY-MM-DD HH:mm:ss'),
          end_at: endTimestamp.format('YYYY-MM-DD HH:mm:ss'),
          user_id: userid })
        .select("*")
        .single();

      setVisibleAcivity(false)

      navigate('/activities');

    }catch(e){
      console.log(e)
    }
  };
  // activity end

  // add weight start

  const inputWeightAmount = useRef();
  const inputWeightStartAt = useRef();

  const handleAddWeight = async () => {

    const weight = inputWeightAmount.current.value;
    const created_at = inputWeightStartAt.current.value;
    const userid = userId;


    const res = await supabase
      .from("weights")
      .insert({ weight, created_at, user_id: userid })
      .select("*")
      .single();
    setVisibleWeight(false)
    console.log('lovely');
    const { error } = await supabase.from('profiles').upsert({
      id: userid,
      weight,
    })

    if (error) {
      throw error
    }


    navigate('/activities');
  };

  const fetchFoods = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      // Fetch logged-in user's goals data
      const { data, error } = await supabase
        .from('foods')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        throw error
      }

      const options = []
      for (let i = 0; i < data.length; i++) {

        let obj = {};
        obj['value'] = data[i].id;
        obj['label'] = data[i].name;
        obj['calories'] = data[i].calories;
        options.push(obj);
      }

      setFoodOptions(options)
      // Set Foods data in state
      setFoods(data || [])
    } catch (error) {
      console.error('Error fetching Foods:', error.message)
    }
  }

  // add meals
  const handleMealInfoChange = (selectedOptions) => {
    console.log(selectedOptions)
    const newMealInfo = [...mealInfo];


    for (let i = 0; i < selectedOptions.length; i++) {
      let notFound = true;
      for(let j = 0; j < newMealInfo.length; j++)
      {
        if(newMealInfo[j].value == selectedOptions[i].value)
        {
          notFound = false;
        }
      }
      if(notFound){
        const obj = {}
        obj.value = selectedOptions[i].value;
        obj.label = selectedOptions[i].label;
        obj.calories = selectedOptions[i].calories;
        obj.baseUnit = selectedOptions[i].calories;
        obj.count = 1;
        newMealInfo.push(obj)
        let total = totalCalories + obj.calories
        setTotalColories(total)
      }

    }
    setMealInfo(newMealInfo);
  }


const inputMealTitle = useRef();
const inputMealCreatedAt = useRef();
const handleFoodCount = (e, value) => {
  const newMealInfo = [...mealInfo];
  let total = 0;

  for(let i =0 ; i < newMealInfo.length; i++)
  {
    if(newMealInfo[i].value == value){
      newMealInfo[i].count = e.target.value;
      newMealInfo[i].calories = newMealInfo[i].baseUnit * newMealInfo[i].count;
    }
    total += newMealInfo[i].calories;
    setTotalColories(total);
  }
  setMealInfo(newMealInfo);
}

const handleAddMeal = async (e) => {
  e.preventDefault();


  const created_at =  moment().format('YYYY-MM-DD HH:mm');
  const title = inputMealTitle.current.value;
  const userid = userId;

  const meals = await supabase
    .from("meals")
    .insert({ title, total_calories: totalCalories, created_at, user_id: userid })
    .select("*")
    .single();

  console.log(mealInfo);

  for(let i = 0; i < mealInfo.length; i++)
  {
    const mealFoods = await supabase
      .from("meal_foods")
      .insert({ meal_id: meals.data.id, food_id: mealInfo[i].value, user_id: userid, food_count: mealInfo[i].count, created_at: created_at, })
      .select("*")
      .single();
    console.log(JSON.stringify(mealFoods))
  }

  setVisibleMeal(false)
  navigate('/meals');
};

// end add meals

const {
  totalSeconds,
  seconds,
  minutes,
  hours,
  days,
  isRunning,
  start,
  pause,
  reset,
} = useStopwatch({ autoStart: false });

return (
  <>
    <div style={{ position: 'fixed', bottom: '50px', right: '50px', zIndex: 9999 }}>
      <CDropdown variant="nav-item no-caret">
        <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
          <div
            style={{
              width: '20px',
              height: '40px',
              borderRadius: '50%',
              // backgroundColor: 'green',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CIcon icon={cilPlus} size="xl" style={{ color: 'white' }} />
          </div>
        </CDropdownToggle>
        <CDropdownMenu className="pt-0" placement="bottom-end">
          <CDropdownItem onClick={() => setVisibleMeal(!visibleMeal)}>
            <CIcon icon={cilUser} className="me-2" />
            Add Meal
          </CDropdownItem>
          <CDropdownItem onClick={() => setVisibleGoal(!visibleGoal)}>
            <CIcon icon={cilSettings} className="me-2" />
            Add Goal
          </CDropdownItem>
          <CDropdownItem onClick={() => setVisibleWeight(!visibleWeight)}>
            <CIcon icon={cilSettings} className="me-2" />
            Record Weight
          </CDropdownItem>
          <CDropdownItem onClick={() => setVisibleAcivity(!visibleAcivity)}>
            <CIcon icon={cilSettings} className="me-2" />
            Add Activity
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
    </div>

    {/* goal modal */}
    <CModal
      backdrop="static"
      visible={visibleGoal}
      onClose={() => setVisibleGoal(false)}
      aria-labelledby="AddGoalModal"
    >
      <CModalHeader>
        <CModalTitle id="AddGoalModal">Add Goal</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <form onSubmit={handleCreateGoal}>
          <div className="mb-3">
            <input className="form-control" ref={inputTitle} placeholder="Title" required={true} type='text' />
          </div>
          <div className="mb-3">
            <select className="form-control" ref={inputType}>
              {goalTypes.map(goalType => (
                <option key={goalType.id} value={goalType.id}>
                  {goalType.name}
                </option>
              ))}
            </select>
          </div>
     
          <div className="mb-3">
            <input className="form-control" ref={inputGoalAmount} placeholder="Duration" type="number" required={true} />
          </div>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleGoal(false)}>
              Close
            </CButton>
            <CButton color="primary" type='submit'>Add Goal</CButton>
          </CModalFooter>
        </form>
      </CModalBody>

    </CModal>

    {/* activity modal */}
    <CModal
      backdrop="static"
      visible={visibleAcivity}
      onClose={() => setVisibleAcivity(false)}
      aria-labelledby="AddActivityModal"
    >
      <CModalHeader>
        <CModalTitle id="AddActivityModal">Add Activity</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <form onSubmit={handleCreateAcivity}>
          <div className="mb-3">
            <input className="form-control" ref={inputActivityTitle} placeholder="Title" type='text' required={true} />
          </div>
          <div className="mb-3">
            <select className="form-control" ref={inputActivityId}>
              {activities.map(activity => (
                <option key={activity.id} value={activity.id}>
                  {activity.name}
                </option>
              ))}
            </select>
          </div>
          {/* <div className="mb-3">
            <input className="form-control" type="datetime-local" ref={inputActivityStartAt} name="time" placeholder="Ex: 2024-02-06 13:15" required={true} hidden={true}/>
          </div>
          <div className="mb-3">
            <input className="form-control" ref={inputActivityAmount} placeholder="Duration" name="duration" type='number' required={true} hidden={true} />
          </div>
          <div className="mb-3">
            <input className="form-control" ref={inputActivityDistance} placeholder="Distance" name="distance" type='number' required={true} hidden={true} />
          </div>
          <div className="mb-3">
            <input className="form-control" ref={inputActivityEnergy} placeholder="Energy" name="energy" type='number' required={true} hidden={true}/>
          </div> */}

          <div className="mb-3">
            <div style={{textAlign: 'center'}}>
              <div style={{fontSize: '100px'}}>
                <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
              </div>
              <p>{isRunning ? 'Running' : 'Not running'}</p>
              <button className='btn btn-primary mx-2' onClick={start}>Start</button>
              <button className='btn btn-secondary mx-2' onClick={pause}>Pause</button>
              <button className='btn btn-danger mx-2' onClick={() => {
                reset();
                pause();
              }}>Reset</button>
            </div>
          </div>
          {isTimerUsed == 2 || isTimerUsed != 0 && <div className='text-danger'>*You didn't run timer or time is less than 60 seconds</div>}
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleAcivity(false)}>
              Close
            </CButton>
            <CButton color="primary" type="submit" >Add Activity</CButton>
          </CModalFooter>
        </form>
      </CModalBody>

    </CModal>
    {/* add weight modal */}
    <CModal
      backdrop="static"
      visible={visibleWeight}
      onClose={() => setVisibleWeight(false)}
      aria-labelledby="AddWeightModal"
    >
      <CModalHeader>
        <CModalTitle id="AddWeightModal">Add Weight</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <form onSubmit={handleAddWeight}>
          <div className="mb-3">
            <input className="form-control" ref={inputWeightAmount} placeholder="Weight" type='number' required={true} />
          </div>
          <div className="mb-3">
            <input className="form-control" type="datetime-local" ref={inputWeightStartAt} placeholder="Ex: 2024-02-06 13:15" required={true} />
          </div>

          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleWeight(false)}>
              Close
            </CButton>
            <CButton color="primary" type="submit" >Add Weight</CButton>
          </CModalFooter>
        </form>
      </CModalBody>

    </CModal>

    {/* add meal modal */}
    <CModal
      backdrop="static"
      visible={visibleMeal}
      onClose={() => setVisibleMeal(false)}
      aria-labelledby="AddMealModal"
    >
      <CModalHeader>
        <CModalTitle id="AddMealModal">Add Meal</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <form onSubmit={handleAddMeal}>
          <div className="mb-3">
            <input className="form-control" ref={inputMealTitle} placeholder="Meal Title" type='text' required={true} />
          </div>
          {/* <div className="mb-3">
              <select className="form-control" multiple onChange={handleFoodChange} required={true}>
                {foods.map(food => (
                  <option key={food.id} value={food.id}>
                    {food.name}
                  </option>
                ))}
              </select>
            </div> */}

          {/* <Select options={options} /> */}

          <Select
            defaultValue={[]}
            isMulti
            name="colors"
            options={foodOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleMealInfoChange}
          />


          {mealInfo.length > 0 && (
            <>
              {mealInfo.map((item, index) => (

                <div key={index} className="mb-3 mt-3 row">
                  <div className="col">
                    <input className="form-control" placeholder="Food Name" type='text' value={item.label} readOnly={true} />
                    <input className="form-control" placeholder="Food Name" type='text' value={item.value} hidden />
                  </div>
                  <div className="col">
                    <input className="form-control" placeholder="Food Count" type='number' value={item.count} onChange={(e) => handleFoodCount(e, item.value)} />
                  </div>
                  <div className="col">
                    <input className="form-control" placeholder="Calorie Count" type='number' value={item.calories} />
                  </div>
                </div>



              ))}
              <div>Total Calorie {totalCalories}</div>
            </>
          )}





          {/* <div className="mb-3">
              <input className="form-control" type="datetime-local" ref={inputMealCreatedAt} placeholder="Ex: 2024-02-06 13:15" required={true} />
            </div> */}

          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleMeal(false)}>
              Close
            </CButton>
            <CButton color="primary" type="submit" >Add Meal</CButton>
          </CModalFooter>
        </form>
      </CModalBody>

    </CModal>
  </>
)
}

export default TaskPlusDropdown
