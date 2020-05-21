/* next */
import Head from "next/head";
import { AppPropsType } from "next/dist/next-server/lib/utils";

/** css */
import "antd/dist/antd.css";
import "react-quill/dist/quill.snow.css";
import "highlight.js/styles/darcula.css";
/** component */
import AppLayout from "../components/layout";
import { withApollo } from "../lib/apollo";

const MyApp = ({ Component }: AppPropsType) => {
  return (
    <>
      <Head>
        <title>diodot's blog</title>
        <link rel="icon" href="/api/image/favicon.ico"></link>
      </Head>
      <AppLayout>
        <Component />
      </AppLayout>
    </>
  );
};

export default withApollo(MyApp);
