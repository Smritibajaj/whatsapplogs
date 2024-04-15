/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import List from "@mui/material/List";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { Box, FormControlLabel, IconButton, Radio } from "@mui/material";
import { Close } from "@mui/icons-material";
export default function MessageDialog(props) {
    const { onClose, open } = props;
    const handleClose = () => {
        onClose(null);
    };
    return (<Dialog onClose={handleClose} open={open}>
      <Box sx={{ borderBottom: "1px solid gray", display: "flex", px: 2 }}>
        <IconButton onClick={handleClose}>
          <Close></Close>
        </IconButton>
        <DialogTitle>Explore</DialogTitle>
      </Box>
      <List sx={{ pt: 0, px: 4 }}>
        {props.selectedValue?.sections?.map((section) => {
            return section.rows?.map((row) => {
                return (<List className="space">
                <FormControlLabel sx={{ width: "100%", justifyContent: 'space-between' }} labelPlacement="start" value={row.title} control={<Radio />} label={row.title}/>
              </List>);
            });
        })}
      </List>
    </Dialog>);
}
