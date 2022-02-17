# (Senior) React Native Developer Assignment

Thank you for showing your interest in `Sanos Group` and for wanting to be part of Sanos Group's **Mobile Development Team**.

This assignment is a chance for you to showcase your technical skills, your creativity as well as your customer sense. We hope it will form a good base for discussion further down the process.

## Task

You are given a bare-bone react-native app. It contains only one Api-Service (_MediaService_) to fetch
metadata for audio files and images.
Please create screens and logic to list the metadata from the _MediaService_ and allow users
to play an audio file of their choice as well as look at the file's detailed metadata.

After your changes the app should:
- Visually list metadata of the files
- show details for the files
- play the audio for a selected file and resume from the last position upon App re-opening
- cache the fetched data
- work offline with cached data

Additionally, the app should fulfil the following requirements:
- it must be functional and robust
- Usability
- Code quality
- it must work on both iOS and Android

## FAQ

**How much time do I have?**

You get 5 days from the time you get this assignment.

**How much time should I spend on this**

The assignment should take no more than 6 hours in total. Time is hard to find though.

**Need any clarification?**

If you have any questions, send us an email directly to: oscar.morillo@sanosgroup.co

Best of luck

**Soultion**

I complete the assignment 

- Visually list metadata of the files **Done**

I made the Audio List screen to show the list of audio files and use the service to get the data from api and store the data to local storage for offline use.

- show details for the files **Done**

I made the detail screen where we show detail of the selected item and play and pause the audio file and cache it when app going to background or we move back to the main screen.

- play the audio for a selected file and resume from the last position upon App re-opening **Done**

Yes its done when we select one audio file and play it and go back or in background or simple pause the track. it resume where we pause it.

- cache the fetched data **Done**

Its done and track play from where we pause it.

- work offline with cached data **Done**

There are many ways to make the app usefull for offile work. currently here i am used the asyncstorage for offline feature.

**Screenshot**

**Audio List Screen**
![Screenshot_20220217_164622](https://user-images.githubusercontent.com/71845533/154486579-a3f1f2c3-e237-422f-88cf-14b5090a9d4b.png)
**Play Audio Screen**
![Screenshot_20220217_164551](https://user-images.githubusercontent.com/71845533/154486617-c6ea6afd-cb5a-4adf-bada-fdd37e7b96f1.png)
