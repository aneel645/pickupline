# In-App Review Implementation Guide

This guide provides instructions for implementing in-app review prompts in the "Pick Up Lines - AI powered" app to improve user engagement and app store ratings.

## Recommended Trigger Points

Implement review prompts at these strategic moments when users are likely to have positive experiences:

1. **After Saving Favorites**

   - Trigger: When a user saves their 5th pickup line to favorites
   - Rationale: User has shown repeated engagement and appreciation

2. **After Successful Generations**

   - Trigger: After the user has successfully generated 10 pickup lines
   - Rationale: User has received value from the core functionality

3. **After Sharing Content**
   - Trigger: After a user shares a pickup line
   - Rationale: User found content valuable enough to share with others

## Implementation Guidelines

### For React Native / Expo

Use the `expo-store-review` package to implement in-app reviews:

```javascript
import * as StoreReview from "expo-store-review";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Keys for tracking user actions
const FAVORITES_COUNT_KEY = "@app:favorites_count";
const GENERATIONS_COUNT_KEY = "@app:generations_count";
const SHARES_COUNT_KEY = "@app:shares_count";
const LAST_REVIEW_REQUEST_DATE_KEY = "@app:last_review_request_date";

// Minimum days between review requests
const MIN_DAYS_BETWEEN_REQUESTS = 90; // 3 months

// Check if review request is allowed
async function canRequestReview() {
  // Check if the device can request a review
  const canRequest = await StoreReview.hasAction();
  if (!canRequest) return false;

  // Check when the last request was made
  const lastRequestDate = await AsyncStorage.getItem(
    LAST_REVIEW_REQUEST_DATE_KEY
  );
  if (lastRequestDate) {
    const daysSinceLastRequest =
      (Date.now() - parseInt(lastRequestDate)) / (1000 * 60 * 60 * 24);
    if (daysSinceLastRequest < MIN_DAYS_BETWEEN_REQUESTS) return false;
  }

  return true;
}

// Request a review if conditions are met
async function requestReviewIfAppropriate() {
  if (await canRequestReview()) {
    await StoreReview.requestReview();
    await AsyncStorage.setItem(
      LAST_REVIEW_REQUEST_DATE_KEY,
      Date.now().toString()
    );
  }
}

// Track when user adds a favorite
export async function trackFavoriteAdded() {
  try {
    const currentCount = parseInt(
      (await AsyncStorage.getItem(FAVORITES_COUNT_KEY)) || "0"
    );
    const newCount = currentCount + 1;
    await AsyncStorage.setItem(FAVORITES_COUNT_KEY, newCount.toString());

    // Request review at 5 favorites
    if (newCount === 5) {
      await requestReviewIfAppropriate();
    }
  } catch (error) {
    console.error("Error tracking favorite:", error);
  }
}

// Track when user generates a pickup line
export async function trackGeneration() {
  try {
    const currentCount = parseInt(
      (await AsyncStorage.getItem(GENERATIONS_COUNT_KEY)) || "0"
    );
    const newCount = currentCount + 1;
    await AsyncStorage.setItem(GENERATIONS_COUNT_KEY, newCount.toString());

    // Request review at 10 generations
    if (newCount === 10) {
      await requestReviewIfAppropriate();
    }
  } catch (error) {
    console.error("Error tracking generation:", error);
  }
}

// Track when user shares a pickup line
export async function trackShare() {
  try {
    const currentCount = parseInt(
      (await AsyncStorage.getItem(SHARES_COUNT_KEY)) || "0"
    );
    const newCount = currentCount + 1;
    await AsyncStorage.setItem(SHARES_COUNT_KEY, newCount.toString());

    // Request review after first share
    if (newCount === 1) {
      await requestReviewIfAppropriate();
    }
  } catch (error) {
    console.error("Error tracking share:", error);
  }
}
```

### Integration Points

Integrate these tracking functions at the following points in your app:

1. **In the Favorites functionality**:

   ```javascript
   // In your component that handles adding to favorites
   import { trackFavoriteAdded } from "../services/review-service";

   const handleAddToFavorites = async (pickupLine) => {
     // Your existing code to add to favorites
     await addToFavorites(pickupLine);

     // Track for review prompt
     await trackFavoriteAdded();
   };
   ```

2. **In the Generation functionality**:

   ```javascript
   // In your AIPickupLineGenerator component
   import { trackGeneration } from "../services/review-service";

   const handleGenerateSuccess = async (generatedLine) => {
     // Your existing code to handle successful generation
     setPickupLine(generatedLine);

     // Track for review prompt
     await trackGeneration();
   };
   ```

3. **In the Share functionality**:

   ```javascript
   // In your component that handles sharing
   import { trackShare } from "../services/review-service";

   const handleShare = async (pickupLine) => {
     // Your existing code to share
     await Share.share({
       message: pickupLine.text,
     });

     // Track for review prompt
     await trackShare();
   };
   ```

## Best Practices

1. **Don't Interrupt**: Never interrupt the user's flow with a review prompt. Wait for natural pauses.

2. **Respect Decisions**: If a user dismisses the review prompt, don't show it again for a significant period.

3. **Test Thoroughly**: Test the review prompt on both iOS and Android to ensure it appears correctly.

4. **Monitor Impact**: Track the correlation between review prompts and app store ratings to refine your strategy.

5. **Be Selective**: Don't ask for reviews too frequently. Quality of reviews is more important than quantity.

## Installation

Add the required package to your project:

```bash
npx expo install expo-store-review @react-native-async-storage/async-storage
```

Then update your app.json to include the necessary permissions:

```json
{
  "expo": {
    // ... existing configuration
    "plugins": [
      // ... existing plugins
      "expo-store-review"
    ]
  }
}
```

## Resources

- [Expo Store Review Documentation](https://docs.expo.dev/versions/latest/sdk/store-review/)
- [Apple's Human Interface Guidelines for Ratings and Reviews](https://developer.apple.com/design/human-interface-guidelines/ratings-and-reviews)
- [Google Play In-App Review API](https://developer.android.com/guide/playcore/in-app-review)
