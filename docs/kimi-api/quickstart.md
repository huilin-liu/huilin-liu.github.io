# Quickstart

> Set up your API key and send your first request to the Kimi API.

This quickstart uses the `Kimi K3` model with the OpenAI-compatible Chat Completions API. To use a different model, see the [Model list](https://platform.kimi.ai/docs/models). To use Kimi with the Anthropic API format, see the [Messages API reference](https://platform.kimi.ai/docs/api/messages).

## Prerequisites

* A [Kimi API Platform account](https://platform.kimi.ai/)
* An [API key](https://platform.kimi.ai/console/api-keys)

## Get started

=== "cURL"

    1. **Set your API key as an environment variable**

        Store your API key in an environment variable. The request below uses the API key stored in `MOONSHOT_API_KEY`.

        Replace `YOUR_KIMI_API_KEY` with the API key you created on the Kimi API Platform.

        ```bash
        export MOONSHOT_API_KEY="YOUR_KIMI_API_KEY"
        ```

    2. **Make your first API call**

        Send a `POST` request to the Chat Completions API.

        ```bash
        curl https://api.moonshot.ai/v1/chat/completions \
            -H "Content-Type: application/json" \
            -H "Authorization: Bearer $MOONSHOT_API_KEY" \
            -d '{
                "model": "kimi-k3",
                "messages": [
                    {"role": "system", "content": "You are Kimi, an AI assistant provided by Moonshot AI. You are especially good at conversations in Chinese and English. You provide users with safe, helpful, and accurate answers. You also refuse to answer any questions involving terrorism, racism, pornography, violence, or similar harmful content. Moonshot AI is a proper noun and must not be translated into other languages."},
                    {"role": "user", "content": "Hi, my name is Li Lei. What is 1+1?"}
                ]
            }'
        ```
        The API returns a response similar to the following:

        For readability, some response values are shortened.

        ```json
        {
          "id": "chatcmpl-...",
          "object": "chat.completion",
          "created": 1788957038,
          "model": "kimi-k3",
          "choices": [
            {
              "index": 0,
              "message": {
                "role": "assistant",
                "content": "Hi Li Lei! Nice to meet you. 1 + 1 = **2** Is there anything else I can help you with?",
                "reasoning_content": "The user is asking a simple math question. [truncated]"
              },
              "finish_reason": "stop"
            }
          ],
          "usage": {
            "prompt_tokens": 188,
            "completion_tokens": 166,
            "total_tokens": 354,
            "completion_tokens_details": {
              "reasoning_tokens": 122
            }
          }
        }
        ```

        The generated content, `id`, `created`, and token usage values might vary between requests.

=== "Python"

    1. **Prepare your Python environment**

        Make sure that you have Python 3.8 or later installed:

        ```bash
        python3 --version
        ```

        Create a virtual environment named `.venv` in your current directory:

        ```bash
        python3 -m venv .venv
        ```

        Activate the virtual environment:

        ```bash
        source .venv/bin/activate
        ```

        After activation, your terminal prompt typically displays `(.venv)`.

    2. **Install the OpenAI SDK**

        ```bash
        python3 -m pip install --upgrade 'openai>=1.0'
        ```

    3. **Set your API key**

        Store your Kimi API key in the `MOONSHOT_API_KEY` environment variable. Replace `YOUR_KIMI_API_KEY` with the API key you created on the Kimi API Platform.

        ```bash
        export MOONSHOT_API_KEY="YOUR_KIMI_API_KEY"
        ```

        The `quickstart.py` file that you create in the next step reads the API key from this environment variable and passes it to the OpenAI client.

    4. **Create the Python file**

        Create a file named `quickstart.py`, and add the following code:

        ```python
        import os

        from openai import OpenAI

        client = OpenAI(
            api_key=os.environ["MOONSHOT_API_KEY"],
            base_url="https://api.moonshot.ai/v1",
        )

        completion = client.chat.completions.create(
            model="kimi-k3",
            messages=[
                {"role": "system", "content": "You are Kimi, an AI assistant provided by Moonshot AI. You are especially good at conversations in Chinese and English. You provide users with safe, helpful, and accurate answers. You also refuse to answer any questions involving terrorism, racism, pornography, violence, or similar harmful content. Moonshot AI is a proper noun and must not be translated into other languages."},
                {"role": "user", "content": "Hi, my name is Li Lei. What is 1+1?"}
            ],
        )

        print(completion.choices[0].message.content)
        ```

    5. **Run the file**

        ```bash
        python3 quickstart.py
        ```

        The response text might differ from run to run.

        ```text
        Hi Li Lei! Nice to meet you.

        1 + 1 = 2.
        ```

=== "Node.js"

    1. **Prepare your Node.js project**

        Make sure that you have Node.js 18 or later installed:

        ```bash
        node --version
        ```

        Create a project directory and initialize a Node.js project:

        ```bash
        mkdir Kimi-quickstart && cd Kimi-quickstart
        npm init -y
        ```

        Then, install the latest version of the OpenAI Node.js SDK:

        ```bash
        npm install openai@latest
        ```

    2. **Set your API key**

        Store your Kimi API key in the `MOONSHOT_API_KEY` environment variable. Replace `YOUR_KIMI_API_KEY` with the API key you created on the Kimi API Platform.

        ```bash
        export MOONSHOT_API_KEY="YOUR_KIMI_API_KEY"
        ```

        The `quickstart.js` file that you create in the next step reads the API key from this environment variable and passes it to the OpenAI client.

    3. **Create the Node.js file**

        Create a file named `quickstart.js`, and add the following code:

        ```javascript
        const OpenAI = require("openai");

        const client = new OpenAI({
          apiKey: process.env.MOONSHOT_API_KEY,
          baseURL: "https://api.moonshot.ai/v1",
        });

        async function main() {
          const completion = await client.chat.completions.create({
            model: "kimi-k3",
            messages: [
              {"role": "system", "content": "You are Kimi, an AI assistant provided by Moonshot AI. You are especially good at conversations in Chinese and English. You provide users with safe, helpful, and accurate answers. You also refuse to answer any questions involving terrorism, racism, pornography, violence, or similar harmful content. Moonshot AI is a proper noun and must not be translated into other languages."},
              {"role": "user", "content": "Hi, my name is Li Lei. What is 1+1?"}
            ]
          });

          console.log(completion.choices[0].message.content);
        }

        main();
        ```

    4. **Run the file**

        ```bash
        node quickstart.js
        ```

        The response text might differ from run to run.

        ```text
        Hi Li Lei! Nice to meet you.

        1 + 1 = **2**

        Feel free to ask if you have any other questions! 😊
        ```

## Next steps

Now that you have sent your first request, explore the following resources:

- [Use the Anthropic API](https://platform.kimi.ai/docs/api/messages) to call Kimi using an Anthropic Messages API-compatible format.
- [Compare models](https://platform.kimi.ai/docs/models) to choose a model for your use case.
- [Stream responses](https://platform.kimi.ai/docs/guide/utilize-the-streaming-output-feature-of-kimi-api) to display generated content as it becomes available.
- [Build a multi-turn conversation](https://platform.kimi.ai/docs/guide/engage-in-multi-turn-conversations-using-kimi-api) by including conversation history in each request.
- [Add image or video input](https://platform.kimi.ai/docs/guide/use-kimi-vision-model) to build multimodal applications.
- [Use tool calls](https://platform.kimi.ai/docs/guide/use-kimi-api-to-complete-tool-calls) to connect Kimi to external functions and services.
- [Review the Chat Completions API reference](https://platform.kimi.ai/docs/api/chat) for complete request and response details.
