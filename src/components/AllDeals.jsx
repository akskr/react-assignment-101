import * as React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Grid} from "@mui/material";
import {allCart} from "./cart";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Link from '@mui/material/Link';

const AllDeals = (props) => {
    const user = props.user;
    const userDeals = user.cart;
    const [open, setOpen] = React.useState(false);
    const [selectedCart, setSelectedCart] = React.useState({});
    const handleDialogClickOpen = () => {
        setOpen(true);
    };
    const handleDialogClose = (value) => {
        setOpen(false);
        setSelectedCart({});
    };

    const handleCartDeails = (item) => {
        setSelectedCart(item);
        handleDialogClickOpen();
    }

    const handleAddToDeals = (item) => {
        const user = props.user;
        const userDeals = user.cart;
        const isAlreadyAdded = userDeals.find((deal) => deal.id === item.id);
        if (isAlreadyAdded) {
            return;
        }
        props.addToDeals && props.addToDeals(user.email, item.id);
    }

    return (<Grid container spacing={2} style={{padding: "40px 250px"}} justifyContent={"center"}>
            {allCart.map((item) => {
                return <Grid item>
                    <Card sx={{ width: 345 }}>
                        <CardMedia
                            sx={{ height: 150}}
                            image={item.imageURL}
                            title={item.name}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div"
                                        style={
                                            {
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                display: '-webkit-box',
                                                WebkitLineClamp: '1',
                                                WebkitBoxOrient: 'vertical'
                                            }
                                        }
                            >
                                {item.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary"
                                        style={
                                            {
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                display: '-webkit-box',
                                                WebkitLineClamp: '1',
                                                WebkitBoxOrient: 'vertical',
                                            }
                                        }
                            >
                                {item.shortDescription}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button disabled={userDeals.indexOf(item.id) !== -1} size="small" onClick={() => handleAddToDeals(item)}>
                                {userDeals.indexOf(item.id) !== -1 ? "Added to deals" : "Add to Deals"}
                            </Button>
                            <Button size="small" onClick={() => handleCartDeails(item)}>Check Details</Button>
                        </CardActions>
                    </Card>
                </Grid>
            })}
            <Dialog onClose={handleDialogClose} open={open} fullWidth
                    maxWidth="sm">
                <DialogTitle>{selectedCart.name}</DialogTitle>
                <DialogContent dividers>
                    <Grid container xs={12}>
                        <Grid item xs={9}>
                            <Grid container xs={12} spacing={2} style={{paddingTop: "10px"}}>
                                <Grid item xs={3}>
                                    <Typography variant="body1" color="text.primary">
                                        Buy From:
                                    </Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <Link target="_blank" href={selectedCart.whereToBuyLink}>{selectedCart.whereToBuyLink}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Grid container xs={12} spacing={2} style={{paddingTop: "10px"}}>
                                <Grid item xs={3}>
                                    <Typography variant="body1" color="text.primary">
                                        Price:
                                    </Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography variant="body2" color="text.secondary">
                                        {selectedCart.price} USD
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container xs={12} spacing={2} style={{paddingTop: "10px"}}>
                                <Grid item xs={3}>
                                    <Typography variant="body1" color="text.primary">
                                        Descriptions:
                                    </Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography variant="body2" color="text.secondary">
                                        {selectedCart.longDescription}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={3}>
                            <CardMedia
                                sx={{ height: 150 }}
                                image={selectedCart.imageURL}
                                title={selectedCart.name}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </Grid>
    );
}


export default AllDeals;