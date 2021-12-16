import React, {useState} from 'react';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import List from '@mui/material/List';
import Container from '@mui/material/Container';

import ShoppingListItem from './ShoppingListItem';
import ShoppingListAppBar from "./AppBar";
import DeleteDialog from "./DeleteDialog";
import {makeStyles} from "@mui/styles";


const useStyles = makeStyles((theme: any) => ({
    emptyData: {
        border: '1px solid #d6d3d3',
        borderRadius: '6px',
        marginBottom: '0.5rem',
        padding: "5rem",
        textAlign: "center",
        marginTop: '3rem',
        lineHeight: '3rem'
    },
}));

export default function ShoppingList({shoppingItems, isLoading, checkItem, openItemEditor, deleteItem}) {

    const classes = useStyles();

    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [itemToDelete, setItemToDelete] = useState();


    return (
        <div>
            <ShoppingListAppBar/>
            <Container sx={{width: '70%'}}>
                {isLoading ?
                    <Box sx={{display: 'flex', justifyContent: 'center', marginTop: '3rem'}}>
                        <CircularProgress/>
                    </Box> :
                    shoppingItems.length !== 0 ? (
                            <>
                                <Grid container spacing={2} sx={{marginTop: '1.5rem', marginBottom: '0.5rem'}}>
                                    <Grid item md={8}>
                                        <Typography variant="h6">
                                            Your Items
                                        </Typography>
                                    </Grid>
                                    <Grid item md={4}>
                                        <Button variant="contained" color="primary" onClick={() => openItemEditor()}
                                                sx={{float: 'right'}}>
                                            Add item
                                        </Button>
                                    </Grid>
                                </Grid>

                                <List sx={{width: '100%', bgcolor: 'background.paper'}}>
                                    {shoppingItems.map((item) => (
                                        <ShoppingListItem
                                            key={item.id}
                                            item={item}
                                            onCheck={() => checkItem(item)}
                                            onEdit={() => openItemEditor(item)}
                                            onDelete={() => {
                                                setItemToDelete(item);
                                                setOpenDeleteDialog(true);
                                            }}
                                        />
                                    ))}
                                </List>
                            </>
                        )
                        : (
                            <>
                                <Box className={classes.emptyData}>
                                    <Typography variant="subtitle1" gutterBottom>Your shopping list is empty :(</Typography>
                                    <Button variant="contained" color="primary" onClick={() => openItemEditor()}>
                                        Add your first item
                                    </Button>
                                </Box>

                            </>
                        )

                }

                <DeleteDialog open={openDeleteDialog} onCancel={() => setOpenDeleteDialog(false)}
                              onConfirm={() => {
                                  deleteItem(itemToDelete);
                                  setOpenDeleteDialog(false);
                              }}/>
            </Container>

        </div>
    );
}