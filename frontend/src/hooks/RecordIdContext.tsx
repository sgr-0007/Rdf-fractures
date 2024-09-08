import React, { createContext, useState, useContext } from 'react';

const RecordIdContext = createContext<{ recordId: string, setRecordId: (id: string) => void } | undefined>(undefined);

export const useRecordId = () => {
    const context = useContext(RecordIdContext);
    if (!context) {
        throw new Error('useRecordId must be used within a RecordIdProvider');
    }
    return context;
};

export const RecordIdProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [recordId, setRecordId] = useState('');

    return (
        <RecordIdContext.Provider value={{ recordId, setRecordId }}>
            {children}
        </RecordIdContext.Provider>
    );
};
