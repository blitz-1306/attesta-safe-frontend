import {
    ChangeEvent,
    FC,
    FormEvent,
    useState,
} from "react";
import {
    Box,
    Button,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    InputLabel,
    FormControl,
    Typography,
} from "@mui/material";
import styles from "../index.module.scss";
import {DynamicFieldArraysTypes, SchemaFieldTypes} from "../../../../lib/constants";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";

interface AttestingDynamicFormProps {
    onSubmit: (formData: any, staticField: any) => void;
}

const AttestingDynamicForm: FC<AttestingDynamicFormProps> = ({
                                                                 onSubmit,
                                                             }) => {
    const [formData, setFormData] = useState([
        {
            name: 'field1',
            value: '',
            type: '',
            data: '',
        },
    ]);
    const [staticData, setStaticData] = useState({
        subject: '',
        key: '',
        expiredAt: 0,
    })

    function handleInputChange(
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index: number,
        name: string,
    ) {
        const {value} = event.target
        const updatedFields = [...formData]
        updatedFields[index] = {...updatedFields[index], [name]: value}
        setFormData(updatedFields)
    }

    const handleChangeStaticData = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const {name, value} = event.target;
        setStaticData(prevState => ({
            ...prevState,
            [name]: value,
        }))
    }

    const onChangeType = (
        event: SelectChangeEvent<string>,
    ) => {
        const {name, value} = event.target
        const updatedFields = [...formData]
        updatedFields.map(field => {
            if (field.name === name) {
                field.type = value
                return field
            }
            return field
        })
    }

    const addNewField = () => {
        setFormData([...formData, {
            name: `field${formData.length + 1}`,
            value: '',
            type: '',
            data: '',
        }])
    }

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        onSubmit(formData, staticData);
        setFormData([{
            name: 'field1',
            value: '',
            type: '',
            data: '',
        }])
        setStaticData({
            subject: '',
            key: '',
            expiredAt: 0,
        })
    };

    const handleExpirationDateChange = (v: any) => {
        if (v) {
            const timestamp = v.unix();

            setStaticData(prevState => ({
                ...prevState,
                expiredAt: timestamp,
            }));
        } else {
            setStaticData(prevState => ({
                ...prevState,
                expiredAt: 0,
            }));
        }
    };

    return (
        <form className={styles.attesting__form} onSubmit={handleSubmit}>
            <Typography variant="h4">Произвольная аттестация</Typography>
            <Box sx={{textAlign: "center"}}>
                <FormControl fullWidth sx={{display: 'flex', gap: '12px', marginBottom: '12px'}}>
                    <TextField
                        id="address"
                        label='Адрес'
                        variant="outlined"
                        name="subject"
                        required
                        value={staticData.subject}
                        onChange={handleChangeStaticData}
                    />
                    <TextField
                        id="key"
                        label='Название аттестации'
                        variant="outlined"
                        name="key"
                        required
                        value={staticData.key}
                        onChange={handleChangeStaticData}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Дата истечения"
                            views={["day", "month", "year"]}
                            onChange={handleExpirationDateChange}
                            slotProps={{
                                actionBar: {
                                    actions: ["clear"],
                                },
                            }}
                        />
                    </LocalizationProvider>
                </FormControl>
                {formData && formData.map((field, index) => (
                    <Box
                        key={index}
                        sx={{
                            display: 'flex',
                            gap: '12px',
                            marginBottom: '12px',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                        }}>
                        <FormControl sx={{width: '32%'}}>
                            <TextField
                                id={field.name}
                                label='Название поля'
                                variant="outlined"
                                name={field.name}
                                value={field.value}
                                onChange={e => handleInputChange(e, index, 'value')}
                            />
                        </FormControl>
                        <FormControl sx={{width: '32%'}}>
                            <TextField
                                id={field.name}
                                label='Данные'
                                variant="outlined"
                                name={field.name}
                                value={field.data}
                                onChange={e => handleInputChange(e, index, 'data')}
                            />
                        </FormControl>
                        <FormControl sx={{width: '32%'}}>
                            <InputLabel id="demo-simple-select-label">Выберите тип</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                name={field.name}
                                value={field.type}
                                label="Выберите тип"
                                onChange={e => onChangeType(e)}
                            >
                                {SchemaFieldTypes && SchemaFieldTypes.map(type => (
                                    <MenuItem
                                        key={type}
                                        value={type}
                                    >
                                        {type} {DynamicFieldArraysTypes.includes(type) && ' | Массив'}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        { DynamicFieldArraysTypes.includes(field.type) && <Typography sx={{width: '100%', fontSize: '12px', textAlign: 'left'}}>
                            Данные нужно вставлять в формате JSON. Например: ["string", "string"]
                        </Typography> }
                    </Box>
                ))}
                <Box sx={{marginTop: '32px'}}>
                    <Button
                        sx={{width: "200px", padding: "16px 0", marginLeft: "5px"}}
                        type="button"
                        variant="contained"
                        onClick={addNewField}
                    >
                        Добавить поле
                    </Button>
                    <Button
                        sx={{width: "200px", padding: "16px 0", marginLeft: "5px"}}
                        type="submit"
                        variant="contained"
                    >
                        Аттестовать
                    </Button>
                </Box>
            </Box>
        </form>
    );
};

export default AttestingDynamicForm;
