
import React, { useState, useEffect } from 'react';
import { Select, Space, Button, message } from 'antd';
import axios from 'axios';

const AntecedentComponent = ({ nDossier }) => {
    const [familiaux, setFamiliaux] = useState([]);
    const [chirurgicaux, setChirurgicaux] = useState([]);
    const [medicaux, setMedicaux] = useState([]);
    const [selectedFamiliaux, setSelectedFamiliaux] = useState([]);
    const [selectedChirurgicaux, setSelectedChirurgicaux] = useState([]);
    const [selectedMedicaux, setSelectedMedicaux] = useState([]);

    useEffect(() => {
        fetchFamiliaux();
        fetchChirurgicaux();
        fetchMedicaux();
    }, []);

    const fetchFamiliaux = async () => {
        try {
            const response = await axios.get('http://localhost:5000/familiaux');
            setFamiliaux(response.data);
        } catch (error) {
            console.error('Failed to fetch familiaux:', error.message);
        }
    };

    const fetchChirurgicaux = async () => {
        try {
            const response = await axios.get('http://localhost:5000/chirurgicaux');
            setChirurgicaux(response.data);
        } catch (error) {
            console.error('Failed to fetch chirurgicaux:', error.message);
        }
    };

    const fetchMedicaux = async () => {
        try {
            const response = await axios.get('http://localhost:5000/medicaux');
            setMedicaux(response.data);
        } catch (error) {
            console.error('Failed to fetch medicaux:', error.message);
        }
    };

    const handleAntecedentSave = async () => {
        const selectedAntecedents = [
            ...selectedFamiliaux,
            ...selectedChirurgicaux,
            ...selectedMedicaux
        ];

        try {
            if (selectedAntecedents.length === 0 || !nDossier) {
                message.error('Please select at least one antecedent and ensure the patient dossier number is set');
                return;
            }

            await axios.post('http://localhost:5000/antecedents', {
                n_dossier: nDossier,
                antecedent_ids: selectedAntecedents, 
            });
            message.success('Antecedents saved successfully');
        } catch (error) {
            console.error('Failed to save antecedents:', error.message);
            message.error('Failed to save antecedents');
        }
    };

    const convertToOptions = (data) => data.map(item => ({
        label: item.nom_antecedent,
        value: item.antecedent_id
    }));

    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder=" Familiaux"
                options={convertToOptions(familiaux)}
                onChange={(value) => setSelectedFamiliaux(value)}
                maxTagCount="responsive"
            />
            <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder=" Chirurgicaux"
                options={convertToOptions(chirurgicaux)}
                onChange={(value) => setSelectedChirurgicaux(value)}
                maxTagCount="responsive"
            />
            <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder=" Medicaux"
                options={convertToOptions(medicaux)}
                onChange={(value) => setSelectedMedicaux(value)}
                maxTagCount="responsive"
            />
            <Button type="primary" onClick={handleAntecedentSave}>
                Enregistrer Antecedents
            </Button>
        </Space>
    );
};

export default AntecedentComponent;

