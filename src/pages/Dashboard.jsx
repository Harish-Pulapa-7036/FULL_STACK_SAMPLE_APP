import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import NotificationsIcon from "@mui/icons-material/Notifications";

// Card data array
const cardData = [
  {
    title: "Total Users",
    value: "1,204",
    color: "#1976d2",
    icon: <PeopleIcon />
  },
  {
    title: "Monthly Revenue",
    value: "$32,500",
    color: "#2e7d32",
    icon: <MonetizationOnIcon />
  },
  {
    title: "Orders Today",
    value: "124",
    color: "#f57c00",
    icon: <ShoppingCartIcon />
  }
];

const Dashboard = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Welcome back, Harish 👋
      </Typography>

      <Typography variant="body1" sx={{ mb: 3 }}>
        Here's a quick overview of your platform performance today.
      </Typography>

      {/* Equal-height, equal-width Stat Cards */}
      <Grid container spacing={3} alignItems="stretch">
        {cardData.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                height: "100%",             // Fill available height
                minHeight: 160,             // Optional: minimum card height
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                padding: 3
              }}
            >
              <Avatar
                sx={{
                  bgcolor: item.color,
                  width: 56,
                  height: 56,
                  mb: 2
                }}
              >
                {item.icon}
              </Avatar>
              <Typography variant="h6">{item.title}</Typography>
              <Typography variant="h4" fontWeight="bold">
                {item.value}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Summary Section */}
      <Box mt={5}>
        <Typography variant="h6" gutterBottom>
          Platform Summary
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Engagement has increased this week. You’ve had 150+ new signups and revenue is trending up by 12%.
          Users are responding positively to your recent UI changes and new product line.
        </Typography>
      </Box>

      {/* Recent Updates Section */}
      <Box mt={5}>
        <Typography variant="h6" gutterBottom>
          What’s New
        </Typography>
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: "#1976d2" }}>
                <NotificationsIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="New feature: Razorpay integration"
              secondary="Now accepting UPI and wallet payments."
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: "#2e7d32" }}>
                <NotificationsIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Performance Update"
              secondary="App speed improved by 30% on mobile devices."
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: "#f57c00" }}>
                <NotificationsIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="User Milestone Reached"
              secondary="1,200 users registered!"
            />
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default Dashboard;
