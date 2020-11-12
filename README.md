# AssignmentDemo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Requirements coverage

Based on document requirement, this project cover all requirement task such as:

- Transfer money (can be found in transfer-form -> shared module)
- View transaction history (can be found in item-list -> shared module)
- Search transaction based on transactions list (can be found in search-controller -> shared module)
- Sort transaction based on transactions list (can be found in sort-controller -> shared module)

Based on document requirement, this project can cover just some non-functional requirement tasks such as:

- Reset the form to its initial state after the transfer has been completed successfully (can be found in transfer-form -> shared module)
- A user shouldn't be able to overdraft their account beyond a balance of \$ -500.00 (can be found in transfer-form -> shared module)
- The Sorting order (ascending/descending) should be persistent across all sorting options (can be found in sort-controller -> shared module)
- i18n -> Basically I don't want to use the i18n that was installed in app by Angular CLI because of confusing syntax and hard to maintain or edit => so i choose @ngrx/translate library that support clear syntax, powerfull in data binding, easy to handle, can lazy load and handle separate from each module
- a11y -> I don;t have time to handle this task but I can write to handle 70-80% this task because Angular material support that match with our purpose such as :

* Screen reader (we don't need to add aria tag but screen reader can cover 70-80 that match)
* Keyboard control (Angular material can't cover in some elements in form)
* Description (fall back text) on image (Cover all)

- Share my project on the remote repository: Github that you can find at (https://github.com/phong211297/assignment/tree/master)

## Code structure

\*\* Style:

- I consider using SCSS in this project divide in :

* Mixin : breakpoint, styled component
* Variable : color, font-size, font-weight, ....
* Style.scss which set all global style for app -> I choose font family to import in here

- Responsive : I choose using Bootstrap to deliver this project on time, i choose to use breakpoint as we can customize and using in scss => code is better, easy to customize and much clean than @media-query

\*\* Production mode and develop mode

- I don't implement any in this section because we just have to develop this round

\*\* Structure code

This project divided into 3 main modules:

- Assignment-api includes :

* Injector => Each service in app will have a private injector so we can easy to manage and detect missing injector
* Models => We are using typescript so i create map model for each api response, parameter required
* Interface => Each interface map with one service => For expand code or unit testing in future
* Service => Service to handle some functional login based on model etc (TransactionService based on TrasactionModel)
* ConfigService => To load app config and inject with APP_INITIALIZER
* AssignmentsApiModule => We don't inject shared service directly like @Injector(forRoot) or inject in app module => We will provide it in one module like AssignmentsApiModule and import AssignmentsApiModule.forRoot() in app module so we can easy handle and manage which service run thought app

- Assignment-core-ui includes :

* Constant => Some section, title or content is not changeable => we pust in constant file
* Modules => In this folder, I create some ui modules which is reuseable and dynamic which is easy to customize in any situations such as:

- Navigation bar module => Using template view => Default is Localization dropdown and App logo but we can input any view in this component to override this + add function into view
- Primary layout that contain navigation bar and main content of page
- Home layout that separate main content in 2 window like design, we can customize to import any view in 2 window as your choice, im this project i import 2 view form and list transactions
- Box layout stand for design of 2 window at Homecomponent
- Item control stands for layout of each item in transaction list => easy to import color,content or view in this

=> As you can see, if we define these modules UI is much harder than we style component as regular but we can reuse it in any page of the app and because of it common behavior, we can reuse it in any different project.

- Assignent-modules includes :

* Constant => Some section, title or content is not changeable => we pust in constant file
* Models => That map some model define in app
* Modules includes :

- SharedTranslateLazy => That lazy load transalate module in each lazy load module but keep the settings of translate root

- Home module => Using home layout as the main page

- App module : as our main module

Sharing module includes :

- Transfer form : form to translate money => Handle translate task + add item to list items

- Search controller : search input => Search keyword in list items

- Sort controller : sort button group => Sort category and option in list item

- Item list : list items => Display list item

As you can see i define those utilities in each module so we can import separate for each and reuse them in any component of the app, because these component is common so we don't want them to do any other funcional diffirent than their main job so this why i desired interaction like this:

- Search controller just emit keyword event to parent component
- Sort controller same as search
- Home will receives event and emit functional to match as event received and input data to list item
- List item just using to receives list and display it
- Transfer form will add data to sync list item in home component by service (using behaviorSubject)

=> For better handle state, i prefer using ngrx but this is small app so we don't want to communicate of 2 component run all though the app.
=> List item is loading dynamically in 2 scenarios :

- If list item had been loaded before => it will be cached so after any reload it will check in cache and loaded from cache instead of json.
- If list item hadn't been loaded before => it will call to get from json file instead

\*\* Assets:

- Font
- i18n : which contains 2 language file :

* en.json
* vn.json

- Images
- Mock json
