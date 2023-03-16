import React, { Fragment, useState } from "react";
import { view, invoke } from "@forge/bridge";
import Textfield from "@atlaskit/textfield";
import Form, {
  Field,
  FormFooter,
  FormSection,
  FormHeader,
} from "@atlaskit/form";
import Button, { ButtonGroup, LoadingButton } from "@atlaskit/button";

function App() {
  const [isLoading, setIsLoading] = useState(false);

  const setTokenHandler = async (val) => {
    setIsLoading(true);
    const token = val.token;
    await invoke("setOpenaiToken", { token });
    const gettoken = await invoke("getOpenaiToken");
    if (gettoken) {
      view.close();
      setIsLoading(false);
      view.refresh();
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Form onSubmit={(value) => setTokenHandler(value)}>
        {({ formProps }) => (
          <form id="form-with-id" {...formProps}>
            <FormHeader
              title="Enter Your OpenAI API Token"
              description="The API key will be stored within the scope of your project."
            />
            <FormSection>
              <Field
                aria-required={true}
                name="token"
                label="OpenAI API Token"
                isRequired
              >
                {({ fieldProps }) => (
                  <Fragment>
                    <Textfield autoComplete="off" {...fieldProps} />
                  </Fragment>
                )}
              </Field>
            </FormSection>
            <FormFooter>
              <ButtonGroup>
                <Button onClick={() => view.close()} appearance="subtle">
                  Cancel
                </Button>
                <LoadingButton
                  type="submit"
                  appearance="primary"
                  isLoading={isLoading}
                >
                  Submit
                </LoadingButton>
              </ButtonGroup>
            </FormFooter>
          </form>
        )}
      </Form>
    </div>
  );
}

export default App;
