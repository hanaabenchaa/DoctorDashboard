import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message, DatePicker } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

const { Item } = Form;

const Patients = () => {
    const [patients, setPatients] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        date_naissance: null,
        address: '',
        telephone: ''
    });

    useEffect(() => {
        fetchPatients();
    }, [searchTerm]);

    useEffect(() => {
        const storedFormData = JSON.parse(localStorage.getItem('formData'));
        if (storedFormData) {
            storedFormData.date_naissance = storedFormData.date_naissance ? moment(storedFormData.date_naissance) : null;
            setFormData(storedFormData);
            form.setFieldsValue(storedFormData);
        }
    }, [form]);

    useEffect(() => {
        const storedPatients = JSON.parse(localStorage.getItem('patients'));
        if (storedPatients) {
            setPatients(storedPatients.map(patient => ({
                ...patient,
                date_naissance: patient.date_naissance ? moment(patient.date_naissance).format('DD-MM-YYYY') : null
            })));
        }
    }, []);

    const fetchPatients = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/patient${searchTerm ? `?nom=${searchTerm}` : ''}`);
            if (response.status === 200) {
                const fetchedPatients = response.data.map(patient => ({
                    ...patient,
                    date_naissance: patient.date_naissance ? moment(patient.date_naissance).format('DD-MM-YYYY') : null
                }));
                setPatients(fetchedPatients);
            } else {
                console.error('Failed to fetch patients:', response.statusText);
            }
        } catch (error) {
            console.error('Failed to fetch patients:', error.message);
        }
    };

    const openModal = () => {
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
        form.resetFields();
        setSelectedPatient(null);
        setFormData({
            nom: '',
            prenom: '',
            date_naissance: null,
            address: '',
            telephone: ''
        });
    };

    const onFinish = async (values) => {
        try {
            values.date_naissance = values.date_naissance ? values.date_naissance.format('YYYY-MM-DD') : null;
            let response;
            if (selectedPatient) {
                response = await axios.put(`http://localhost:5000/patient/${selectedPatient.n_dossier}`, values);
            } else {
                response = await axios.post("http://localhost:5000/patient", values);
            }
            if (response.status === 200) {
                fetchPatients();
                closeModal();
            } else {
                console.error('Failed to add/update patient:', response.statusText);
            }
        } catch (error) {
            console.error('Failed to add/update patient:', error.message);
        }
    };

    const handleEditPatient = (patient) => {
        patient.date_naissance = patient.date_naissance ? moment(patient.date_naissance, 'YYYY-MM-DD') : null;
        setSelectedPatient(patient);
        setIsModalVisible(true);
        form.setFieldsValue(patient);
        setFormData(patient);
    };

    const handleDeletePatient = async (n_dossier) => {
        try {
            const response = await axios.delete(`http://localhost:5000/patient/${n_dossier}`);
            if (response.status === 200) {
                fetchPatients();
                message.success('Patient deleted successfully');
            } else {
                console.error('Failed to delete patient:', response.statusText);
                message.error('Failed to delete patient');
            }
        } catch (error) {
            console.error('Failed to delete patient:', error.message);
            message.error('Failed to delete patient');
        }
    };

    const columns = [
        { title: 'N_dossier', dataIndex: 'n_dossier', key: 'n_dossier' },
        { title: 'Nom', dataIndex: 'nom', key: 'nom' },
        { title: 'Prénom', dataIndex: 'prenom', key: 'prenom' },
        { title: 'Date de Naissance', dataIndex: 'date_naissance', key: 'date_naissance' },
        { title: 'Adresse', dataIndex: 'address', key: 'address' },
        { title: 'Téléphone', dataIndex: 'telephone', key: 'telephone' },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => (
                <>
                    <Button icon={<EditOutlined />} onClick={() => handleEditPatient(record)}>Modifier</Button>
                    <Button icon={<DeleteOutlined />} onClick={() => handleDeletePatient(record.n_dossier)} danger>Supprimer</Button>
                    <Link to={`/consultation/${record.n_dossier}?nom=${record.nom}&prenom=${record.prenom}`}>
                        <Button>Consulter</Button>
                    </Link>
                </>
            )
        }
    ];

    const handleInputChange = (event) => {
        const newValue = event.target.value;
        setSearchTerm(newValue);
        localStorage.setItem('searchTerm', newValue);
    };

    const handleFormChange = (changedValues, allValues) => {
        if (changedValues.date_naissance) {
            allValues.date_naissance = changedValues.date_naissance;
        }
        setFormData(allValues);
        localStorage.setItem('formData', JSON.stringify(allValues));
    };

    return (
        <div>
            <div style={{ marginBottom: '10px' }}>
                <Input
                    placeholder="Rechercher par Nom"
                    value={searchTerm}
                    onChange={handleInputChange}
                    prefix={<SearchOutlined />}
                    allowClear
                />
            </div>
            <Button type="primary" icon={<PlusOutlined />} onClick={openModal}>Ajouter Patient</Button>
            <Table dataSource={patients} columns={columns} />

            <Modal
                title={selectedPatient ? "Modifier Patient" : "Ajouter Nouveau Patient"}
                visible={isModalVisible}
                onCancel={closeModal}
                footer={null}
            >
                <Form
                    form={form}
                    onFinish={onFinish}
                    initialValues={formData}
                    onValuesChange={handleFormChange}
                    layout="vertical"
                >
                    <Item label="Nom" name="nom" rules={[{ required: true, message: 'Veuillez entrer le nom du patient!' }]}>
                        <Input />
                    </Item>
                    <Item label="Prénom" name="prenom" rules={[{ required: true, message: 'Veuillez entrer le prénom du patient!' }]}>
                        <Input />
                    </Item>
                    <Item label="Date de Naissance" name="date_naissance" rules={[{ required: true, message: 'Veuillez entrer la date de naissance du patient!' }]}>
                        <DatePicker format="DD-MM-YYYY" />
                    </Item>
                    <Item label="Adresse" name="address" rules={[{ required: true, message: 'Veuillez entrer l\'adresse du patient!' }]}>
                        <Input />
                    </Item>
                    <Item label="Téléphone" name="telephone" rules={[{ required: true, message: 'Veuillez entrer le numéro de téléphone du patient!' }]}>
                        <Input />
                    </Item>
                    <Item>
                        <Button type="primary" htmlType="submit">Valider</Button>
                    </Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Patients;
