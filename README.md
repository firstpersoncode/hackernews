This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, build the app:

```bash
npm run build
# or
yarn build
# or
pnpm build
```

Wait until the build process finish, then run the server:

```bash
npm run start
# or
yarn start
# or
pnpm start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Architecture

#### Client-side:

- HTML and CSS: Responsible for presenting the user interface (UI) and handling user interactions.
- React.js and Javascript: Facilitates UI development and provides a structured approach to manage client-side logic.

#### Server-side:

- Next.js: Handles back-end, serve the front-end, request handling, and routing.

#### Communication:

- RESTful APIs: Enable communication between the client-side and server-side components, allowing data retrieval and submission.
- JSON (JavaScript Object Notation): Used for data serialization and exchange between the client and server.

#### Infrastructure:

- -

## Features

#### Render Stories

![Render Stories](https://doc-08-6o-docs.googleusercontent.com/docs/securesc/i43se422l4c1dimbglnroluce0apu43p/ug9bdqn68bmontq51e856m23eo0dq42f/1687159200000/18267062149387836818/12623569892640555288/19ZVFSkEoqc8ruDWrHOu-P98yNOh7_Ax7?ax=ADWCPKAqrzkO1claOcnVFa5MY_Z1gQx1IyX2pieq6aMd9087C7t9VX5neQp_SdvW3m40rSpDBokiNXzbouDIRVThDbt6gDsHdCiH41a4lyyWXnRc2cgaNHbQ-I6qynxlXuxTY8fmbF4HPnPsQ6kznj7n4VtTXXI0SSQIj50WBJj06p42m9CFiWJei_SaG3qKtodWAABEfUggp7pU8UG7_MKFw3RQnCDm_eoMFqyU_lK1LitcmBfLJvCbcQsRZewc93In9GIHVOH8Je0JTeV1w1Penmt9oRFCBKpaEYeDODyJz_45gvMy0u7VI9ZXedD1S5cYAhjRLEkyLZzGXm3C2gDqzJytWzLLN94vj4H8toqrt6VQEqKF0CZghcIVr_ydXmGDoRVV_uNG0VzzHf2TgrX3UapkCeJmOhko0OXrBepxqFVH37EP32Rq7Y5mq3NeA0EOYcAnj00kTKbfKfy9GCuggDbPFHGxWmb0MkudQGW990TnVR2iHX0Zj3275weRtC2szVsrE6HNpWWO8nV3ijUo-I8Qj4T6ThiMeREBA-HEZ2dOir7Bwgex2yu8GiMhBGPI4t9KyvV3CbKHj2VxVT8FE35lbnoN8JvxEomX6UfSqA9XyYBYHSpMArtnW_HeuvvlBBGWoXCPPUtGM_qnzC_JC-YRqhNszOBcJhowIHJNJmKYSS9vWp57iDJTpUdTkUZkHpef8RY9muWBkbuW3ctSZRSOlIOzLobKYhDuT99lhjVzyACBX67l8-Itp0t_ZJOWTxZFkqmtafJoY3XFPf6WWOJI-7SncNms03TFFWKqwiCAVE7eg1hVS974mKxVmYbG6sCdkcqeCn9NWGdx3lszb2S9TYyev_LRhHbQMjQUI1R_0xKK9bn01phF0liQCQJMwT0tYWa2SMr8T7xCkF21YSIzMQla2qJ9nsYvEwE5HsIB4xax5PK9Ddj_-ljc7Z3T53eSyZuYJNoHSu3khXQUNcvN0QZDYJPPsQebM8IVlr8RQZ5Sf4S5afsJcMXy5aKmn2Fqa09yqXZSWCKw4ciEDTNyDaBCa7wWz-0TeOr1UUOLL7deQ26w&uuid=a39438cd-4758-48e8-992a-04a64ca57309&authuser=0)
The feature involves fetching the top stories from an API and populating the story objects asynchronously. The process allows parallel population and incorporates filtering based on a query string containing a value within the title field for each item.

##### Component Rendering and Initial Fetch

1. The component responsible for rendering the top stories feature is mounted or rendered in the React application.
2. Upon rendering, the component initiates a fetch request to the API to retrieve the top stories.
3. The API responds with an array of story IDs.

##### Populating Story Objects

1. For each story ID received, the component starts the asynchronous process of populating the story object, this is due to the API limitation on providing text-based search, so we need to populate every ids and implement the text-based search logic in our component.
2. Multiple populate processes can occur simultaneously without blocking each other.
3. Each populate process retrieves the complete structure of the story object using the corresponding ID.
4. Once the structure is obtained, the process creates the complete form of the story object.
5. The story object in its complete form is then inserted into the component's state, specifically the "items" state.

##### Query String and Filtering

1. The component subscribes to changes in the query string within the browser.
2. If the query string is updated, the component triggers a filtering process on the "items" state.
3. The filtering process evaluates the query string value against the title field of each item.
4. Only the items whose id field or title field contains the query string value are included in the filtered result.
5. The filtered result is displayed or rendered in the component, reflecting the updated query string.

#### Search Stories

![Search Story](https://doc-04-6o-docs.googleusercontent.com/docs/securesc/i43se422l4c1dimbglnroluce0apu43p/e0peip1322bet084jb89pts9ep54ip2f/1687159275000/18267062149387836818/12623569892640555288/1SRi-viHFrqFIC2qLsQleSSSmL_QJTvOG?ax=ADWCPKBHrgqjyAtGUi28XTdyzl1iVaW90I7VaeOecBNj9O8z4Cs4hFKvhDfIjw_qmRR1mkd2_C4sTxX4M09aDZieKgogsIVvrAGeQ9RPQ2cMp9flnBWzyBr_nTVeXh6a9laFQWkfkxUcKIMc6n7FF4SU_2dYdiD9BjKLHJ20Dl-nt_ebIkUTn1SSF34_PNpAa4c_NL9sBMx0q2QLDtVHn6MBvMhc4K6DC7RHjeUb8CUgIdkVFSuPeQ-CI-a3wUkwq5MmPJmz4aRlRohxCp-knnx0ccDgCTLyjpYTDDV9syAuxLn2985QuZ6jVPswqbzUaFCo7S_Vz5b9pH9A9TV0e-x5pq06NeVd901owO9UhklWnzI-eh1R0ZbgL6TyheOboQyMLZOxh-DBtcUUwoYOeVzRQazvHTf_MSxJ882UwskfQpxxkwxd1U0BTA4e_TXD2j7Q-IQ4n-63LFB8-dNXRX1NfGC7igG71gz-DDlZTOBRYQBn1uxQhSVyPvN2izmMgaUq0NsVqzVdIni7Ampot6409KWlTEmjAV4aLX2JvU1KurHIt3NJe3611ftdog_9MDtleOywE1Cgthnhd5L3Ti74U3I62YnPvhDIoIBAPtF-fLZBfy8QGJ88Uh1MrDRuZlsgW_jbU1hvowRPbd6ZfOLOfdk7GgMLpiR8Pe5DymXORkbspE5TacjiH8PZSKwKG4deAJTedis_1tGqNt3QyQdcBCnY1enEQ1_VPsga9bsXjOneY_IWuaFjLlo_3m8UCFOLATkjBoVO1rR0O9EhnYlIqBz0gUTAI0IZ_f_A9Aar4GK8ceZ2fAqK5wAkKGNqwskvjkRLX1e6PQ0uTuTFH69mr9KaU8aeuHb1UOIK2v4h6O0qKX9k-SnS8rwnQg3BSxAJrcSsMTYVrNeEczBNQlnj5unP5dLfiVvZQbLtLQlQYfmHHUUyedBwHj5CUcJYlykKlQppz_760-Kc0VwTjhQvNlxO8qTcl9FJ5GkdLfLCbzFkCsKZww-VrM-hbBdkxCYGeggtRkQ-n8TRkwvBQBON6KHr-LuL8LBw5soAduhx3reeyLPx7FS3&uuid=52cd1aa5-634c-489d-8b1e-5e1a560e3524&authuser=0)
![History Change](https://doc-0s-6o-docs.googleusercontent.com/docs/securesc/i43se422l4c1dimbglnroluce0apu43p/gljslaed6nup3amg6d7tno5sj57sribe/1687159125000/18267062149387836818/12623569892640555288/1CYVh6ABFrMBXovEH3S6ARbFVjsmiTM8X?ax=ADWCPKCkkgpamdVJRUP8SNzBNavOsmmJs3PaI2AP5bxNu-_EVd9kM19HTwtUcg8Lf8cjydlKqAvZa0TowqzjJ9SyP2J5Icfw1q5DpvLqvl7vH7WH1aeeRtTvaifFjmLyLa9drdVj9Cjc_x-HEY141hIe97d7GfvBDYOBopW4F5se4x2N2TBlyVQ2ti4bB58wY2JgGaTu61L_NZ37aFABBpN-WWmbupndzzvHcR9E5FlSflQFyKPKtLmV2OSy5kSKTSpScC17vJRZT2SPHpmNkSTh_xS-oUARuSZYQ87HR1H6PeDxOeCkWFFhuEoNDOwC2umEUGnoLiMF2-8GrD-I_eV2u-Z4-Z02_8JV8JS-n4A9lWzrDrmo-mMCZndwyZ01pXGoqZZtb4OKuuZCTPsgrPth0B9LTv9arrtyU5SQ08VjXd6h1rmMFRtk3iTxqIJR8-ooUFRKbtzGDrxE98nlgor-xucgJlTjWiRgyDt28ZHMCpvya8--8aKFAIkpGlwMFswn-k9SwblUumu47sGoQpBBVwTzt-oUNlGG-jGVkIlq6LaX5RtJlhEagRxFEMlhjvMDlgl8ckpK8Sql3sJjYPBo8WcIm91SdzQzb2rxPcOeauhZV5A6ErJROv2ONq06Yxojp7LQXIPMIGiQJTDKwSk2Z0JSzQ7WsPTFBFCaVoVURTy7a_BXBv5U2TVswYgbMwNBa3iKPVDR9fhUXyhfQdK7d4kciPLnzpdo2cPwJiFZzIBNp50yUdrc2jjJP56P7wisk02F6FTWvBpx4T4CvPDrKsTqg21U_GyEOlIPDHeWmucCzpfOiiWwJqrAAIDUuLchGHKiH_5Glbp2bNvucg9rczl5cHF9Gn6O0sIOEXINe9GdyvdWqk_72hW8iBOUj7PWYLzuSiC4scNRKaijuR7m7kCoGmLdzprw6Ax0Ju_uZhmBJjJhxdQW2Y-EQVdPWog6OylXzxss1x3jtvSOOz4yIvZvCDMmCTLblR-H5dXJOzgGb6q8KZ4IWdugMdFA_ayGIE20ThgG9R9bMlEyvv-eQ1OshBINXMcXNpMKWouI_t8V8sQ1nfcF&uuid=90aeb5fa-2b74-41e7-9d3d-64887709cdf2&authuser=0&nonce=h1g12hocnhci8&user=12623569892640555288&hash=9lf9id0ghipltup4l9cu2ev2hu52dk04)
The feature involves updating the query string in the browser after the user stops typing in the search field, using the query string to filter the story list, and maintaining query string update history for navigation using the browser's back and forward buttons.

##### Query String Update with Debounce

1. The component responsible for the search story feature includes a search field where the user can input their search query.
2. As the user types in the search field, a debounce function is used to delay the query string update.
3. After the user stops typing for 3000ms, the query string is updated with the latest search query entered by the user.
4. The component also pushes the updated query string to the browser's history, enabling navigation using the back and forward buttons.

##### Story List Filtering

1. The component monitors changes in the query string within the browser.
2. When the query string is updated, the component triggers a filtering process on the story list.
3. Since the API does not provide direct support for filtering based on the search query, the search logic needs to be implemented within the component.

##### Search Logic Implementation

1. The component receives the updated query string and begins the search logic implementation.
2. The search logic iterates through each story in the story list.
3. For each story, the logic checks if the title or any other relevant field contains the search query.
4. If a match is found, the story is included in the filtered result.
5. If no match is found, the story is excluded from the filtered result.

##### Displaying Filtered Results

1. The component renders or displays the filtered result, which includes only the stories that match the search query.
2. The filtered result is updated dynamically as the user continues to modify the search query.
3. The component provides a responsive user interface, reflecting the updated query string and displaying the relevant stories based on the search logic implemented within the component.

##### Query String Update History

1. After the query string is updated, the component pushes the query string update to the browser's history.
2. This enables the user to navigate the filter result by clicking the back and forward buttons on the browser.
3. When the user clicks the back button, the component detects the query string update in the history and triggers the corresponding filtering process to display the previous filter result.
4. Similarly, when the user clicks the forward button, the component detects the query string update in the history and triggers the corresponding filtering process to display the next filter result.
