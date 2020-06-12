/* next */
import Head from "next/head";

/** css */
import "antd/dist/antd.css";
import "react-quill/dist/quill.snow.css";
import "highlight.js/styles/darcula.css";
/** component */
import AppLayout from "../components/Layout/index";
import { withApollo } from "../lib/apollo";
import { ProvideAuth } from "../lib/auth";

const MyApp = ({ Component }) => {
  return (
    <ProvideAuth>
      <Head>
        <title>diodot's blog</title>
        <link rel="icon" href="/api/image/favicon.ico"></link>
      </Head>
      <AppLayout>
        <Component />
      </AppLayout>
    </ProvideAuth>
  );
};

export default withApollo(MyApp);
