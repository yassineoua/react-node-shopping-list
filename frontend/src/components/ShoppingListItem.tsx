import React from 'react';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditIcon from '@mui/icons-material/EditOutlined';
import {makeStyles} from '@mui/styles';

const useStyles = makeStyles((theme: any) => ({
    root: {
        border: '1px solid #d6d3d3',
        borderRadius: '4px',
        marginBottom: '0.5rem'
    },
    purchased_tem: {
        background: 'rgba(213, 223, 233, 0.17)',
        '& .item-name' : {
            color: theme.palette.primary.main
        }
    }
}));

export default function ShoppingListItem({onCheck, onEdit, onDelete, item}) {

    const classes = useStyles();

    return (
        <ListItem style={{textDecoration: !!item.purchased ? 'line-through' : 'none'}}
                  className={classes.root + ' ' + (!!item.purchased ? classes.purchased_tem : '')}>
            <ListItemIcon>
                <Checkbox
                    edge="start"
                    tabIndex={-1}
                    disableRipple
                    checked={!!item.purchased}
                    onClick={() => onCheck(item)}
                />
            </ListItemIcon>
            <ListItemText
                primary={<Typography className="item-name">{item.name}</Typography>}
                secondary={item.description}/>
            <ListItemSecondaryAction>
                <Box>
                    <IconButton aria-label="edit" sx={{marginRight: '10px'}} onClick={() => onEdit(item)}>
                        <EditIcon/>
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => onDelete(item)}>
                        <DeleteIcon/>
                    </IconButton>
                </Box>
            </ListItemSecondaryAction>
        </ListItem>
    );
}