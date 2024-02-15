import React, {useState, useEffect, useRef} from 'react'
import { supabase } from '../../helper/supabaseClient';
import { useNavigate } from 'react-router-dom';
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilSettings,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
import AddGoalModal from '../../components/modals/AddGoalModal';
import { CButton, CModal, CModalBody, CModalHeader, CModalTitle, CModalFooter } from '@coreui/react'


const NewTaskHeaderDropdown = () => {
  const [visibleGoal, setVisibleGoal] = useState(false)
  const [userId, setUserId] = useState(null);
  const [activities, setActivities] = useState([]);
  const [goalTypes, setGoalTypes] = useState([]);

  useEffect(() => {
    fetchUserId();
    fetchActivities();
    fetchGoalTypes();
  }, []);

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

  const fetchUserId = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setUserId(user.id);
    } catch (error) {
      console.error('Error fetching user ID:', error.message);
    }
  };

  const inputTitle = useRef();
  const inputType = useRef();
  const inputStartAt = useRef();
  const inputGoalAmount = useRef();

  const navigate = useNavigate();

  const handleCreateGoal = async () => {
      const title = inputTitle.current.value;
      const type = inputType.current.value;
      const start_at = inputStartAt.current.value;
      const end_at = inputStartAt.current.value;
      const goal_amount = inputGoalAmount.current.value;
      const userid = userId;

      const res = await supabase
          .from("goals")
          .insert({title, type, start_at, end_at, goal_amount, user_id: userid})
          .select("*")
          .single();

      setVisibleGoal(false)

      navigate('/goals');
  };

  return (
    <>
      <CDropdown variant="nav-item">
        <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
          <CIcon icon={cilPlus} size="lg" />
        </CDropdownToggle>
        <CDropdownMenu className="pt-0" placement="bottom-end">
          <CDropdownItem href="#">
            <CIcon icon={cilUser} className="me-2" />
            Add Meal
          </CDropdownItem>
          <CDropdownItem onClick={() => setVisibleGoal(!visibleGoal)}>
            <CIcon icon={cilSettings} className="me-2" />
            Add Goal
          </CDropdownItem>
          <CDropdownItem href="#">
            <CIcon icon={cilSettings} className="me-2" />
            Record Weight
          </CDropdownItem>
          <CDropdownItem href="#">
            <CIcon icon={cilSettings} className="me-2" />
            Track Activity
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
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
          <form>
              <div className="mb-3">
                  <input className="form-control" ref={inputTitle} placeholder="Title" />
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
                  <input className="form-control" type="datetime-local" ref={inputStartAt} placeholder="Ex: 2024-02-06 13:15" />
              </div>
              <div className="mb-3">
                  <input className="form-control" ref={inputGoalAmount} placeholder="Duration" />
              </div>
          </form>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleGoal(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={handleCreateGoal}>Add Goal</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default NewTaskHeaderDropdown
