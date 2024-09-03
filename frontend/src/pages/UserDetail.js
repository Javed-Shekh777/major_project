import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import * as React from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { toast } from 'react-toastify';

import EditRoundedIcon from "@mui/icons-material/EditRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import SummaryApi from "../common";

const UserDetail = () => {
  const [data, setData] = React.useState();
  console.log(" \n Update user ; ",data );


  const userData = async()=>{
    const fetchData = await fetch(SummaryApi.current_user.url, {
        method: SummaryApi.current_user.method,
        credentials: "include",
      });

      const data = await fetchData.json();

      if (data.success) {
         
        setData(data);
      }

      if (data.error) {
        toast.error(data.message);
      }
  }

  React.useEffect(()=>{
      userData();
  });

  return (
    <>
      <Card className="dark:bg-slate-900">
        <Box sx={{ mb: 1 }}>
          <Typography level="title-md">User Info </Typography>
          <Typography level="body-sm">
            Customize how your profile information will apper to the networks.
          </Typography>
        </Box>
        <Divider />
        <Stack
          direction="row"
          spacing={3}
          sx={{ display: { xs: "none", md: "flex" }, my: 1 }}
        >
          <Stack direction="column" spacing={1}>
            <AspectRatio
              ratio="1"
              maxHeight={200}
              sx={{ flex: 1, minWidth: 120, borderRadius: "100%" }}
            >
              
              {
                          data?.data?.profilePic ? (
                            <img src={data?.data?.profilePic} className='w-10 h-10 rounded-full' alt={data?.data?.name} />
                          ) : (
                            <FaRegCircleUser/>
                          )
                        }
            </AspectRatio>
            <IconButton
              aria-label="upload new picture"
              size="sm"
              variant="outlined"
              color="neutral"
              sx={{
                bgcolor: "background.body",
                position: "absolute",
                zIndex: 2,
                borderRadius: "50%",
                left: 100,
                top: 170,
                boxShadow: "sm",
              }}
            >
              <EditRoundedIcon />
            </IconButton>
          </Stack>
          <Stack spacing={2} sx={{ flexGrow: 1 }}>
            <Stack spacing={1}>
              <FormLabel>Name</FormLabel>
              <FormControl
                sx={{ display: { sm: "flex-column", md: "flex-row" }, gap: 2 }}
              >
                <Input size="sm" placeholder="First name" value={data?.data?.name} />
              </FormControl>
            </Stack>
            <Stack direction="row" spacing={2}>
              {/* <FormControl>
                  <FormLabel>Role</FormLabel>
                  <Input size="sm" defaultValue="UI Developer" />
                </FormControl> */}
              <FormControl sx={{ flexGrow: 1 }}>
                <FormLabel>Email</FormLabel>
                <Input
                  size="sm"
                  type="email"
                  value={data?.data?.email}
                  startDecorator={<EmailRoundedIcon />}
                  placeholder="email"
                  defaultValue="siriwatk@test.com"
                  sx={{ flexGrow: 1 }}
                />
              </FormControl>
            </Stack>
            {/* <div>
                <CountrySelector />
              </div> */}
          </Stack>
        </Stack>
        <Stack
          direction="column"
          spacing={2}
          sx={{ display: { xs: "flex", md: "none" }, my: 1 }}
        >
          <Stack direction="row" spacing={2}>
            <Stack direction="column" spacing={1}>
              <AspectRatio
                ratio="1"
                maxHeight={108}
                sx={{ flex: 1, minWidth: 108, borderRadius: "100%" }}
              >
                <FaRegCircleUser />
                {/* {
                          user?.profilePic ? (
                            <img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name} />
                          ) : (
                            <FaRegCircleUser/>
                          )
                        } */}
              </AspectRatio>
              <IconButton
                aria-label="upload new picture"
                size="sm"
                variant="outlined"
                color="neutral"
                sx={{
                  bgcolor: "background.body",
                  position: "absolute",
                  zIndex: 2,
                  borderRadius: "50%",
                  left: 85,
                  top: 180,
                  boxShadow: "sm",
                }}
              >
                <EditRoundedIcon />
              </IconButton>
            </Stack>
            <Stack spacing={1} sx={{ flexGrow: 1 }}>
              <FormLabel>Name</FormLabel>
              <FormControl
                sx={{
                  display: {
                    sm: "flex-column",
                    md: "flex-row",
                  },
                  gap: 2,
                }}
              >
                <Input size="sm" placeholder="name" />
              </FormControl>
            </Stack>
          </Stack>
          {/* <FormControl>
              <FormLabel>Role</FormLabel>
              <Input size="sm" defaultValue="UI Developer" />
            </FormControl> */}
          <FormControl sx={{ flexGrow: 1 }}>
            <FormLabel>Email</FormLabel>
            <Input
              size="sm"
              type="email"
              startDecorator={<EmailRoundedIcon />}
              placeholder="email"
              defaultValue="siriwatk@test.com"
              sx={{ flexGrow: 1 }}
            />
          </FormControl>
          {/* <div>
              <CountrySelector />
            </div> */}
        </Stack>
        <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
          <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
            <Button size="sm" variant="outlined" color="neutral">
              Cancel
            </Button>
            <Button size="sm" variant="solid">
              Save
            </Button>
          </CardActions>
        </CardOverflow>
      </Card>
    </>
  );
};

export default UserDetail;
