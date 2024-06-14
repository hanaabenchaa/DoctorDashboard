
//le code original 
/*import React, { useState } from 'react';
import { Form, Input, Button, Select, Row, Col, Card, Typography, List } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;
const { Item } = Form;

const OrdonnanceComponent = () => {
    const [medicaments, setMedicaments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [form] = Form.useForm();
    const [filteredMedicaments, setFilteredMedicaments] = useState([]);

    const handleSearch = (value) => {
        setSearchTerm(value);
        if (value === '') {
            setFilteredMedicaments([]);
        } else {
            const filtered = medicaments.filter(medicament =>
                medicament.designation.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredMedicaments(filtered);
        }
    };

    const onFinish = (values) => {
        setMedicaments([...medicaments, values]);
        form.resetFields();
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="content-area">
            <Title level={2}>Ordonnance</Title>
            <Row gutter={[16, 16]}>
                <Col span={6}>
                    <Input
                        placeholder="Rechercher des médicaments"
                        prefix={<SearchOutlined />}
                        onChange={(e) => handleSearch(e.target.value)}
                        value={searchTerm}
                        allowClear
                    />
                </Col>
                <Col span={18}>
                    <Form form={form} onFinish={onFinish} layout="inline">
                        <Item name="type" rules={[{ required: true, message: 'Sélectionnez le type d\'ordonnance!' }]}>
                            <Select placeholder="Type d'ordonnance">
                                <Option value="ordonnance1">Ordonnance 1</Option>
                                <Option value="ordonnance2">Ordonnance 2</Option>
                            </Select>
                        </Item>
                        <Item name="utilisation" rules={[{ required: true, message: 'Entrez l\'utilisation!' }]}>
                            <Input placeholder="Utilisation du médicament" />
                        </Item>
                        <Item name="duree" rules={[{ required: true, message: 'Entrez la durée!' }]}>
                            <Input placeholder="Durée" />
                        </Item>
                        <Item name="frequence" rules={[{ required: true, message: 'Entrez la fréquence!' }]}>
                            <Input placeholder="Nombre de fois par jour" />
                        </Item>
                        <Item name="heure" rules={[{ required: true, message: 'Entrez l\'heure!' }]}>
                            <Select placeholder="Heure">
                                <Option value="avant">Avant</Option>
                                <Option value="apres">Après</Option>
                                <Option value="pendant">Pendant</Option>
                            </Select>
                        </Item>
                        <Item name="note">
                            <Input placeholder="Note" />
                        </Item>
                        <Item>
                            <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
                                Ajouter
                            </Button>
                        </Item>
                    </Form>
                </Col>
            </Row>
            <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
                <Col span={24}>
                    <Card title="Médicaments Ajoutés" extra={<Button onClick={handlePrint}>Imprimer</Button>}>
                        <List
                            dataSource={searchTerm ? filteredMedicaments : medicaments}
                            renderItem={(item, index) => (
                                <List.Item key={index}>
                                    <List.Item.Meta
                                        title={`Médicament ${index + 1}`}
                                        description={
                                            <>
                                                <div>Type: {item.type}</div>
                                                <div>Utilisation: {item.utilisation}</div>
                                                <div>Durée: {item.duree}</div>
                                                <div>Fréquence: {item.frequence}</div>
                                                <div>Heure: {item.heure}</div>
                                                <div>Note: {item.note}</div>
                                            </>
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default OrdonnanceComponent;*/
//the best code 
/*import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Row, Col, Card, Typography, List } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;
const { Item } = Form;

const OrdonnanceComponent = () => {
    const [medicaments, setMedicaments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [form] = Form.useForm();
    const [filteredMedicaments, setFilteredMedicaments] = useState([]);
    const [selectedMedicament, setSelectedMedicament] = useState(null);
    const [addedMedicaments, setAddedMedicaments] = useState([]);

    useEffect(() => {
        const fetchMedicaments = async () => {
            const response = await fetch('http://localhost:5000/medicaments');
            const data = await response.json();
            setMedicaments(data);
        };

        fetchMedicaments();
    }, []);

    const handleSearch = (value) => {
        setSearchTerm(value);
        if (value === '') {
            setFilteredMedicaments([]);
        } else {
            const filtered = medicaments.filter(medicament =>
                medicament.designation.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredMedicaments(filtered);
        }
    };

    const handleSelectMedicament = (medicament) => {
        setSelectedMedicament(medicament);
        form.setFieldsValue({
            designation: medicament.designation,
            dosage: medicament.dosage,
            forme: medicament.forme,
        });
        setFilteredMedicaments([]);
        setSearchTerm(medicament.designation);
    };

    const onFinish = (values) => {
        const newMedicament = { ...values, id: selectedMedicament.id_medicaments };
        setAddedMedicaments([...addedMedicaments, newMedicament]);
        form.resetFields();
        setSelectedMedicament(null);
        setSearchTerm('');
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="content-area">
            <Title level={2}>Ordonnance</Title>
            <Row gutter={[16, 16]}>
                <Col span={6}>
                    <Input
                        placeholder="Rechercher des médicaments"
                        prefix={<SearchOutlined />}
                        onChange={(e) => handleSearch(e.target.value)}
                        value={searchTerm}
                        allowClear
                    />
                    <List
                        dataSource={filteredMedicaments}
                        renderItem={(item) => (
                            <List.Item onClick={() => handleSelectMedicament(item)}>
                                {item.designation}
                            </List.Item>
                        )}
                    />
                </Col>
                <Col span={18}>
                    <Form form={form} onFinish={onFinish} layout="inline">
                        <Item name="designation">
                            <Input placeholder="Désignation" disabled />
                        </Item>
                        <Item name="dosage">
                            <Input placeholder="Dosage" disabled />
                        </Item>
                        <Item name="forme">
                            <Input placeholder="Forme" disabled />
                        </Item>
                        <Item name="utilisation" rules={[{ required: true, message: 'Entrez l\'utilisation!' }]}>
                            <Input placeholder="Utilisation du médicament" />
                        </Item>
                        <Item name="duree" rules={[{ required: true, message: 'Entrez la durée!' }]}>
                            <Input placeholder="Durée" />
                        </Item>
                        <Item name="frequence" rules={[{ required: true, message: 'Entrez la fréquence!' }]}>
                            <Input placeholder="Nombre de fois par jour" />
                        </Item>
                        <Item name="heure" rules={[{ required: true, message: 'Entrez l\'heure!' }]}>
                            <Select placeholder="Heure">
                                <Option value="avant">Avant</Option>
                                <Option value="apres">Après</Option>
                                <Option value="pendant">Pendant</Option>
                            </Select>
                        </Item>
                        <Item name="note">
                            <Input placeholder="Note" />
                        </Item>
                        <Item>
                            <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
                                Ajouter
                            </Button>
                        </Item>
                    </Form>
                </Col>
            </Row>
            <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
                <Col span={24}>
                    <Card title="Médicaments Ajoutés" extra={<Button onClick={handlePrint}>Imprimer</Button>}>
                        <List
                            dataSource={addedMedicaments}
                            renderItem={(item, index) => (
                                <List.Item key={index}>
                                    <List.Item.Meta
                                        title={`Médicament ${index + 1}`}
                                        description={
                                            <>
                                                <div>Désignation: {item.designation}</div>
                                                <div>Dosage: {item.dosage}</div>
                                                <div>Forme: {item.forme}</div>
                                                <div>Utilisation: {item.utilisation}</div>
                                                <div>Durée: {item.duree}</div>
                                                <div>Fréquence: {item.frequence}</div>
                                                <div>Heure: {item.heure}</div>
                                                <div>Note: {item.note}</div>
                                            </>
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default OrdonnanceComponent;*/

import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Row, Col, Card, Typography, List } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;
const { Item } = Form;

const OrdonnanceComponent = () => {
    const [medicaments, setMedicaments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [form] = Form.useForm();
    const [filteredMedicaments, setFilteredMedicaments] = useState([]);
    const [selectedMedicament, setSelectedMedicament] = useState(null);
    const [addedMedicaments, setAddedMedicaments] = useState([]);

    useEffect(() => {
        const fetchMedicaments = async () => {
            try {
                const response = await fetch('http://localhost:5000/medicaments');
                const data = await response.json();
                setMedicaments(data);
            } catch (error) {
                console.error('Error fetching medications:', error);
            }
        };

        fetchMedicaments();
    }, []);

    const handleSearch = (value) => {
        setSearchTerm(value);
        if (value === '') {
            setFilteredMedicaments([]);
        } else {
            const filtered = medicaments.filter(medicament =>
                medicament.designation.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredMedicaments(filtered);
        }
    };

    const handleSelectMedicament = (medicament) => {
        setSelectedMedicament(medicament);
        form.setFieldsValue({
            designation: medicament.designation,
            dosage: medicament.dosage,
            forme: medicament.forme,
        });
        setFilteredMedicaments([]);
        setSearchTerm(medicament.designation);
    };

    const onFinish = (values) => {
        const newMedicament = {
            ...values,
            id: selectedMedicament.id, // assuming selectedMedicament has an id field
            designation: selectedMedicament.designation,
            dosage: selectedMedicament.dosage,
            forme: selectedMedicament.forme,
        };
        setAddedMedicaments([...addedMedicaments, newMedicament]);
        form.resetFields();
        setSelectedMedicament(null);
        setSearchTerm('');
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="content-area">
            <Title level={2}>Ordonnance</Title>
            <Row gutter={[16, 16]}>
                <Col span={6}>
                    <Input
                        placeholder="Rechercher des médicaments"
                        prefix={<SearchOutlined />}
                        onChange={(e) => handleSearch(e.target.value)}
                        value={searchTerm}
                        allowClear
                    />
                    <List
                        dataSource={filteredMedicaments}
                        renderItem={(item) => (
                            <List.Item onClick={() => handleSelectMedicament(item)}>
                                {item.designation}
                            </List.Item>
                        )}
                    />
                </Col>
                <Col span={18}>
                    <Form form={form} onFinish={onFinish} layout="inline">
                        <Item name="designation">
                            <Input placeholder="Désignation" disabled />
                        </Item>
                        <Item name="dosage">
                            <Input placeholder="Dosage" disabled />
                        </Item>
                        <Item name="forme">
                            <Input placeholder="Forme" disabled />
                        </Item>
                        <Item name="typeOrdonnance" rules={[{ required: true, message: 'Sélectionnez le type d\'ordonnance!' }]}>
                            <Select placeholder="Type d'ordonnance">
                                <Option value="chronique">ordonnance 1</Option>
                                <Option value="aigue">ordonnance 2</Option>
                            </Select>
                        </Item>
                        <Item name="utilisation" rules={[{ required: true, message: 'Entrez l\'utilisation!' }]}>
                            <Input placeholder="Utilisation du médicament" />
                        </Item>
                        <Item name="duree" rules={[{ required: true, message: 'Entrez la durée!' }]}>
                            <Input placeholder="Durée" />
                        </Item>
                        <Item name="frequence" rules={[{ required: true, message: 'Entrez la fréquence!' }]}>
                            <Input placeholder="Nombre de fois par jour" />
                        </Item>
                        <Item name="heure" rules={[{ required: true, message: 'Entrez l\'heure!' }]}>
                            <Select placeholder="Heure">
                                <Option value="avant">Avant</Option>
                                <Option value="apres">Après</Option>
                                <Option value="pendant">Pendant</Option>
                            </Select>
                        </Item>
                        <Item name="note">
                            <Input placeholder="Note" />
                        </Item>
                        <Item>
                            <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
                                Ajouter
                            </Button>
                        </Item>
                    </Form>
                </Col>
            </Row>
            <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
                <Col span={24}>
                    <Card title="Médicaments Ajoutés" extra={<Button onClick={handlePrint}>Imprimer</Button>}>
                        <List
                            dataSource={addedMedicaments}
                            renderItem={(item, index) => (
                                <List.Item key={index}>
                                    <List.Item.Meta
                                        title={`Médicament ${index + 1}`}
                                        description={
                                            <>
                                                <div>Désignation: {item.designation}</div>
                                                <div>Dosage: {item.dosage}</div>
                                                <div>Forme: {item.forme}</div>
                                                <div>Type d'Ordonnance: {item.typeOrdonnance}</div>
                                                <div>Utilisation: {item.utilisation}</div>
                                                <div>Durée: {item.duree}</div>
                                                <div>Fréquence: {item.frequence}</div>
                                                <div>Heure: {item.heure}</div>
                                                <div>Note: {item.note}</div>
                                            </>
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default OrdonnanceComponent;
