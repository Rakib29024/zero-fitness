import { supabase } from '../../helper/supabaseClient';
import React, { useRef, useState } from 'react';

import { CButton, CModal, CModalBody, CModalHeader, CModalTitle, CModalFooter } from '@coreui/react'

function AddGoalModal({user}) {

    const inputTitle = useRef();
    const inputType = useRef();
    const inputStartAt = useRef();
    const inputEndAt = useRef();
    const inputGoalAmount = useRef();
    const inputGoalUnit = useRef();

    const handleCreateGoal = async () => {
        const title = inputTitle.current.value;
        const type = inputType.current.value;
        const start_at = inputStartAt.current.value;
        const end_at = inputEndAt.current.value;
        const goal_amount = inputGoalAmount.current.value;
        const goal_unit = inputGoalUnit.current.value;

        const res = await supabase
            .from("goals")
            .insert({title, type, start_at, end_at, goal_amount, goal_unit, user_id: user.id})
            .select("*")
            .single();

        console.log(res);

    };

    const [visible, setVisible] = useState(false)

    return (
          <>
            <CModal
            visible={visible}
            onClose={() => setVisible(false)}
            aria-labelledby="LiveDemoExampleLabel"
            >
            <CModalHeader onClose={() => setVisible(false)}>
                <CModalTitle id="LiveDemoExampleLabel">Modal title</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <p>Woohoo, you're reading this text in a modal!</p>
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" onClick={() => setVisible(false)}>
                Close
                </CButton>
                <CButton color="primary">Save changes</CButton>
            </CModalFooter>
            </CModal>
        </>
    );
}

export default AddGoalModal;