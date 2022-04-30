import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useHistory } from "react-router-dom";

function BackButton(){
    const history=useHistory();
    return (
        <Button variant="contained" sx={{margin:2}} color="primary" startIcon={<ArrowBackIosIcon />} onClick={()=>history.goBack()}>
         Back
      </Button>
    );
}
export {BackButton};