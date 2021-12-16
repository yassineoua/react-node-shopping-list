import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {addItem, closeEditor, updateItem} from '../store/actions';
import {makeStyles} from '@mui/styles';


const useStyles = makeStyles((theme: any) => ({
    topBar: {
        background: '#FAFAFA !important',
        boxShadow: 'none !important',
        borderBottom: '1px solid #D5DFE9',
        fontSize: '1.25rem',
        "& .topBar-title": {
            color: '#5C6269',
            textTransform: 'uppercase',
            flexGrow: '1'
        }
    },
    btnGroup: {
        boxShadow: 'none !important',
        "& > *:not(:last-child)": {
            marginRight: theme.spacing(2)
        }
    }
}));

const mapStateToProps = (state) => {
    return {open: state.editor.open, item: state.editor.selectedItem};
};

function ShoppingItemEditor({open, item, dispatch}) {

    const classes = useStyles();

    const [nameValue, setNameValue] = useState('');
    const [descriptionValue, setDescriptionValue] = useState('');
    const [quantityValue, setQuantityValue] = useState();
    const [purchasedValue, setPurchasedValue] = useState(false);

    const isCreateMode = !item;

    useEffect(() => {
        if (item) {
            setNameValue(item.name);
            setDescriptionValue(item.description);
            setQuantityValue(item.quantity);
            setPurchasedValue(!!item.purchased);
        }
    }, [item]);


    const handleAddItemAction = () => {
        const _item = {
            ...item, name: nameValue, description: descriptionValue,
            quantity: quantityValue, purchased: purchasedValue
        };
        dispatch(isCreateMode ? addItem(_item) : updateItem(_item));
        clearFields();
    };

    const handleCancelAction = () => {
        dispatch(closeEditor());
        clearFields();
    };

    const clearFields = () => {
        setNameValue('');
        setDescriptionValue('');
        setQuantityValue(null as any);
        setPurchasedValue(false);
    };

    const disableBtn = () => {
        return !nameValue || nameValue.match(/^ *$/) !== null;
    };


    // @ts-ignore
    return (
        <Drawer anchor={'right'} open={open}>
            <AppBar position="static" className={classes.topBar}>
                <Toolbar>
                    <Typography variant="h6" component="div" className={"topBar-title"}>
                        Shopping List
                    </Typography>
                    <IconButton size="large" edge="start" onClick={() => handleCancelAction()}>
                        <NavigateNextIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Container sx={{width: '600px', paddingTop: '15px'}}>
                <Stack spacing={2}>
                    <Box>
                        <Box sx={{typography: 'h6'}}>{isCreateMode ? 'Add an item' : 'Edit an item'}</Box>
                        <Box
                            sx={{typography: 'subtitle1'}}>{isCreateMode ? 'Add your new item below' : 'Edit your item below'}</Box>
                    </Box>
                    <FormControl fullWidth>
                        <TextField label="Item Name" variant="outlined" value={nameValue}
                                   onChange={(e) => setNameValue(e.target.value)}/>
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField label="Description" multiline rows={4} variant="outlined" value={descriptionValue}
                                   onChange={(e) => setDescriptionValue(e.target.value)}/>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="select-label">How many ?</InputLabel>
                        <Select label="How many ?" labelId="select-label" value={quantityValue}
                                onChange={(e) => setQuantityValue(e.target.value as any)}>
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <FormControlLabel control={<Checkbox checked={purchasedValue}
                                                             onChange={() => setPurchasedValue(!purchasedValue)}/>}
                                          label="Purchased"/>
                    </FormControl>

                </Stack>

                <Box sx={{textAlign: 'right', marginTop: '2rem'}}>
                    <ButtonGroup variant="contained" className={classes.btnGroup}>
                        <Button variant="outlined" onClick={() => handleCancelAction()}>Cancel</Button>
                        <Button onClick={() => handleAddItemAction()}
                                disabled={disableBtn()}>{isCreateMode ? 'Add' : 'Save'} Task</Button>
                    </ButtonGroup>
                </Box>
            </Container>

        </Drawer>
    );
}

export default connect(mapStateToProps)(ShoppingItemEditor);