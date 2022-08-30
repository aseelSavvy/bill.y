import React, { useState, useEffect, useContext } from 'react'
import './AddItem.css'

//Custom Components
import TextInput from '../../../../components/textInput/TextInput'
import ClientContext from "../../../../ClientContext";


//Material UI
import { Button, Grid } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';

function AddItem() {
    const { items, setItems } = useContext(ClientContext);

    //States 
    const [itemName, setItemName] = useState();
    const [NOofBoxes, setNOofBoxes] = useState();
    const [kgPerBox, setKgPerBox] = useState();
    const [amtPerBoxINR, setAmtPerBoxINR] = useState(Number);
    const [amtPerBoxUSD, setAmtPerBoxUSD] = useState(Number);

    //Currency Converter0
    useEffect(() => {
        let Amount = Number(amtPerBoxINR)
        setAmtPerBoxUSD(Amount / 60)
    }, [amtPerBoxINR]);

    useEffect(() => {
        setAmtPerBoxINR(amtPerBoxUSD * 60)
    }, [amtPerBoxUSD])

    //Set error in empty fields
    function errorSetter() {
        setItemName(!itemName && "");
        setNOofBoxes(!NOofBoxes && "");
        setKgPerBox(!kgPerBox && "");
        if (!amtPerBoxINR && !amtPerBoxUSD) alert("Please enter amount per box");
    }

    //Add Button handler
    const AddButtonHandler = () => {
        if (!itemName || !NOofBoxes || !kgPerBox || (!amtPerBoxINR && !amtPerBoxUSD)) {
            errorSetter();
            return;
        } else {

            let TotalWeight = NOofBoxes * kgPerBox;
            let TotalINR = NOofBoxes * amtPerBoxINR;
            let TotalUSD = NOofBoxes * amtPerBoxUSD;
            setItems([...items, { itemName, NOofBoxes, kgPerBox, amtPerBoxINR, amtPerBoxUSD, TotalWeight, TotalINR, TotalUSD }]);
        }

    }

    return (
        <div className='add-item-wrapper'>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextInput label='Item Name' value={itemName} setValue={setItemName} />
                </Grid>
                <Grid item xs={6}>
                    <TextInput type='Number' label='No of Boxes' value={NOofBoxes} setValue={setNOofBoxes} />
                </Grid>
                <Grid item xs={6}>
                    <TextInput type='Number' label='Kg Per Box' value={kgPerBox} setValue={setKgPerBox} />
                </Grid>
                <Grid item xs={6}>
                    <TextInput type='Number' label='Amount/Box ₹' value={amtPerBoxINR} setValue={setAmtPerBoxINR} />
                </Grid>
                <Grid item xs={6}>
                    <TextInput type='Number' label='Amount/Box $' value={amtPerBoxUSD} setValue={setAmtPerBoxUSD} />
                </Grid>
                <Grid item xs={12}>
                    <Button fullWidth variant="contained" endIcon={<AddIcon />} onClick={AddButtonHandler} >Add Item</Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default AddItem