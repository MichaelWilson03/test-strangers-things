// import * as React from "react";

// import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
// import Typography from "@mui/material/Typography";
// import CardContent from "@mui/material/CardContent";
// import { Link } from "react-router-dom";
// import { Link as RouterLink } from "react-router-dom";
// // import { LinkProps } from '@mui/material/Link';
// // import { makeStyles } from "@mui/styles";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { styled } from "@emotion/styled/types/base";
// // import RouterLink from "./RouterLink";

// const Root = styled((theme) => ({
//   author: {
//     fontWeight: "bold",
//   },
//   headerAuthor: {
//     backgroundColor: "#f4f5f6",
//   },
// }));

// const Message = () => {
//   const classes = useStyles();
//   const { message, user, posts } = useOutletContext;

//   const isActivePost = posts.some((post) => post._id === message?.post?._id);
//   const isAuthor = message?.fromUser?._id === user._id;

//   const headerContent = (
//     <CardContent>
//       <Typography
//         gutterBottom
//         variant="h6"
//         color={isAuthor ? "textSecondary" : "textPrimary"}
//         component="h2"
//       >
//         {isAuthor ? (
//           <> (Sent By Me)</>
//         ) : (
//           <> From: {message.fromUser.username}</>
//         )}
//       </Typography>
//       <Typography variant="body1">{message.content}</Typography>
//       <Typography variant="body2" color="textSecondary" component="p">
//         {isActivePost ? (
//           <Link
//             component={RouterLink}
//             to={`/posts/${message?.post?._id}`}
//             variant="button"
//             className={classes.addLink}
//           >
//             <b>{!isAuthor ? "View My Post" : "Message Again"}:</b>{" "}
//             {message?.post?.title}
//           </Link>
//         ) : (
//           <>
//             <b>Post:</b> {message?.post?.title}
//             <br></br>
//             (deleted post)
//           </>
//         )}
//       </Typography>
//     </CardContent>
//   );

//   return message ? (
//     <Card raised={true} style={{ margin: ".2rem" }}>
//       {headerContent}
//       <CardActions className={message.isAuthor ? classes.headerAuthor : ""}>
//         {children}
//       </CardActions>
//     </Card>
//   ) : (
//     "Loading..."
//   );
// };
// export default Message;

export default function EditMessage() {
  async function updatePost(e) {
    e.preventDefault();
    const data = {
      title: title,
      description: description,
      price: price,
      willDeliver: willDeliver,
    };
    try {
      const response = await fetch(`${BASE_URL}/posts/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          post: {
            title: title,
            description: description,
            price: price,
            willDeliver: willDeliver,
          },
        }),
      });
      const result = await response.json();
      console.log(result);
      if (result.success) {
        setData(result.data.post);
      }
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <div>
      <h1>this does nothing yet</h1>
    </div>
  );
}
