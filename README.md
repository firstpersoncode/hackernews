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

![Render Stories](public/Feat_Render stories.png?raw=true)
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

![Search Story](public/Feat_Search story.png?raw=true)
![History Change](public/Feat_History change.png?raw=true)
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
