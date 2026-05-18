import React from 'react';
import GenericList from '../../../components/admin/ui/GenericList';

const CaseStudyList = () => {
    return (
        <GenericList
            title="Case Studies"
            addNewLabel="Add New Case Study"
            createPath="/admin/case-study/create"
        />
    );
};

export default CaseStudyList;
