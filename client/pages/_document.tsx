import Document, { DocumentContext } from "next/document";
import { ServerStyleSheet, createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  html, body {
    height: 100%;
    overflow: auto;
  }
  #__next {
    height: 100%;
  }
`;

class MyDocument extends Document {
  static async getInitialProps(context: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = context.renderPage;

    context.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) =>
          sheet.collectStyles(
            <>
              <GlobalStyles />
              <App {...props} />
            </>
          ),
      });

    const initialProps = await Document.getInitialProps(context);
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {sheet.getStyleElement()}
        </>
      ),
    };
  }
}

export default MyDocument;
