Demos:
- ios (https://drive.google.com/file/d/1Y5Dz57ndWlGQOZb4RtW5UR0J4hgfFr6p/view?usp=drive_link)
- android (https://drive.google.com/file/d/19SCoTeG4zAieubivcPNb8t8XZQi0mB7V/view?usp=sharing)

How to run locally?

Android:
1. yarn install
2. open folder android in android studio and click green button 'run-app'
3. yarn run android for running metro

ios:
1. yarn install
2. open in xcode file Valetax.xcworkspace click button build
3. cd ios pod install
4. yarn run ios

What architecture in this project?
- Atomic design (https://atomicdesign.bradfrost.com/)

What dependendencies in the project?

1. tanstack/react-query
- For Caching requests, hooks are very helpful

2. ky
- Simple api, for retries failed requests

3. zod
- For convenient schema typing

4. lodash
- Use debounce for improving performance flat list
