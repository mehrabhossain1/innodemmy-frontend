# Google Tag Manager Implementation Guide

## ✅ What Was Fixed

### 1. **Environment Variable Configuration**

- ✅ GTM ID now uses `NEXT_PUBLIC_GTM_ID` from `.env`
- ✅ Easy to change for different environments (dev/staging/production)

### 2. **Data Layer Initialization**

- ✅ Data layer initializes BEFORE GTM loads
- ✅ Captures original location for accurate tracking
- ✅ Properly structured for GTM container

### 3. **Facebook Pixel Migration**

- ✅ Removed Facebook Pixel from layout
- ⚠️ **Action Required**: Add Facebook Pixel through GTM interface
    - Go to GTM → Tags → New Tag → Facebook Pixel
    - Use trigger: All Pages
    - Add Pixel ID: `790890226728568`

### 4. **Type Safety**

- ✅ Created comprehensive TypeScript types in `types/gtm.d.ts`
- ✅ All data layer events are now typed
- ✅ Supports Enhanced Ecommerce (GA4)

### 5. **Centralized Tracking Utilities**

- ✅ Created `lib/utils/gtm.ts` with reusable functions
- ✅ Development mode logging (doesn't pollute production data)
- ✅ Error handling for all GTM pushes

### 6. **Context Provider**

- ✅ Created `lib/contexts/GTMContext.tsx`
- ✅ Automatically tracks page views on navigation
- ✅ Updates user context in data layer
- ✅ Provides `useGTM()` hook for custom events

### 7. **Authentication Tracking**

- ✅ Login events tracked
- ✅ Signup events tracked
- ✅ Logout events tracked
- ✅ User ID included in all events

---

## 📊 Data Layer Structure

Your GTM Data Layer now updates on:

1. **Page Load** - Initial page context
2. **Navigation** - New page view with type
3. **User Auth** - Login, signup, logout events
4. **User Context** - User ID, role, email updates
5. **Ecommerce** - View item, add to cart, checkout, purchase

---

## 🔧 How to Use in Your Code

### **1. Track Course Views**

```typescript
import { trackCourseView } from "@/lib/utils/gtm";

// Inside your course page component
useEffect(() => {
    trackCourseView({
        id: "course-123",
        name: "Python Essentials for Machine Learning",
        price: 8000,
        originalPrice: 15000,
        category: "Machine Learning",
        instructor: "John Doe",
    });
}, []);
```

### **2. Track Enrollment Actions**

```typescript
import { trackEnrollmentStart, trackCheckoutBegin } from "@/lib/utils/gtm";

// When user clicks "Enroll Now"
const handleEnrollClick = () => {
    trackEnrollmentStart({
        id: courseId,
        name: courseTitle,
        price: coursePrice,
        category: courseCategory,
    });

    // Open enrollment modal
    setShowModal(true);
};

// When proceeding to checkout
const handleCheckout = () => {
    trackCheckoutBegin({
        id: courseId,
        name: courseTitle,
        price: coursePrice,
        category: courseCategory,
    });

    router.push("/checkout");
};
```

### **3. Track Purchase Success**

```typescript
import { trackPurchase } from "@/lib/utils/gtm";

// After successful payment
trackPurchase({
    transactionId: "TXN-" + Date.now(),
    value: totalAmount,
    items: [
        {
            id: courseId,
            name: courseName,
            category: courseCategory,
            price: coursePrice,
        },
    ],
});
```

### **4. Track Blog Views**

```typescript
import { trackBlogView } from "@/lib/utils/gtm";

// In blog post page
useEffect(() => {
    trackBlogView({
        id: blogId,
        title: blogTitle,
        category: blogCategory,
        author: blogAuthor,
    });
}, []);
```

### **5. Track Webinar Registrations**

```typescript
import { trackWebinarRegistration } from "@/lib/utils/gtm";

const handleWebinarSignup = async () => {
    await registerForWebinar(webinarId);

    trackWebinarRegistration({
        id: webinarId,
        title: webinarTitle,
        date: webinarDate,
    });
};
```

### **6. Track Custom User Actions**

```typescript
import { trackUserAction } from "@/lib/utils/gtm";

// Track button clicks
const handleDownloadBrochure = () => {
    trackUserAction("download_brochure", {
        course_id: courseId,
        course_name: courseName,
    });
};

// Track video plays
const handleVideoPlay = (videoTitle: string) => {
    trackUserAction("video_play", {
        video_title: videoTitle,
        course_id: courseId,
    });
};
```

### **7. Use GTM Context Hook**

```typescript
import { useGTM } from "@/lib/contexts/GTMContext";

const MyComponent = () => {
    const { trackEvent } = useGTM();

    const handleCustomEvent = () => {
        trackEvent("custom_event", {
            custom_param: "value",
            another_param: 123,
        });
    };
};
```

---

## 🎯 Example: Complete Course Page Implementation

```typescript
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    trackCourseView,
    trackEnrollmentStart,
    trackCheckoutBegin,
    trackUserAction
} from "@/lib/utils/gtm";

export default function CoursePage() {
    const params = useParams();
    const router = useRouter();
    const [course, setCourse] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        // Fetch course data
        fetchCourseData(params.slug).then((data) => {
            setCourse(data);

            // Track course view
            trackCourseView({
                id: data._id,
                name: data.title,
                price: data.price,
                originalPrice: data.originalPrice,
                category: data.category,
                instructor: data.instructor
            });
        });
    }, [params.slug]);

    const handleEnrollClick = () => {
        if (course) {
            // Track enrollment intention
            trackEnrollmentStart({
                id: course._id,
                name: course.title,
                price: course.price,
                category: course.category
            });

            setShowModal(true);
        }
    };

    const handleProceedToCheckout = () => {
        if (course) {
            // Track checkout begin
            trackCheckoutBegin({
                id: course._id,
                name: course.title,
                price: course.price,
                category: course.category
            });

            router.push(`/checkout?course=${course._id}`);
        }
    };

    const handleDownloadSyllabus = () => {
        trackUserAction("download_syllabus", {
            course_id: course._id,
            course_name: course.title
        });

        // Download logic...
    };

    return (
        <div>
            {/* Your course UI */}
            <button onClick={handleEnrollClick}>Enroll Now</button>
            <button onClick={handleDownloadSyllabus}>Download Syllabus</button>
        </div>
    );
}
```

---

## 🚀 Setting Up GTM Container

### **1. Variables to Create in GTM**

Go to GTM → Variables → User-Defined Variables:

| Variable Name | Type                | Configuration              |
| ------------- | ------------------- | -------------------------- |
| `pageType`    | Data Layer Variable | `page.type`                |
| `pageTitle`   | Data Layer Variable | `page.title`               |
| `pagePath`    | Data Layer Variable | `page.path`                |
| `userId`      | Data Layer Variable | `user.id` or `user_id`     |
| `userRole`    | Data Layer Variable | `user.role` or `user_role` |
| `ecommerce`   | Data Layer Variable | `ecommerce`                |

### **2. Triggers to Create**

| Trigger Name    | Type         | Condition                |
| --------------- | ------------ | ------------------------ |
| All Pages       | Page View    | All pages                |
| Page View Event | Custom Event | `event = page_view`      |
| Course View     | Custom Event | `event = view_item`      |
| Add to Cart     | Custom Event | `event = add_to_cart`    |
| Begin Checkout  | Custom Event | `event = begin_checkout` |
| Purchase        | Custom Event | `event = purchase`       |
| Login           | Custom Event | `event = login`          |
| Signup          | Custom Event | `event = signup`         |

### **3. Tags to Create**

#### **GA4 Configuration Tag**

- Tag Type: Google Analytics: GA4 Configuration
- Measurement ID: Your GA4 Measurement ID (e.g., `G-XXXXXXXXXX`)
- Trigger: All Pages

#### **GA4 Event - Course View**

- Tag Type: Google Analytics: GA4 Event
- Configuration Tag: [Your GA4 Config]
- Event Name: `view_item`
- Event Parameters:
    - `currency`: `{{ecommerce.currency}}`
    - `value`: `{{ecommerce.value}}`
    - `items`: `{{ecommerce.items}}`
- Trigger: Course View

#### **GA4 Event - Add to Cart**

- Tag Type: Google Analytics: GA4 Event
- Configuration Tag: [Your GA4 Config]
- Event Name: `add_to_cart`
- Event Parameters: (same as above)
- Trigger: Add to Cart

#### **Facebook Pixel - Page View**

- Tag Type: Custom HTML
- HTML: Your Facebook Pixel code
- Trigger: All Pages

#### **Facebook Pixel - Purchase**

- Tag Type: Custom HTML
- HTML: Facebook Purchase event code
- Trigger: Purchase

---

## 🐛 Debugging

### **1. Check Data Layer in Browser Console**

```javascript
// View entire data layer
console.log(window.dataLayer);

// Monitor new events
window.dataLayer.push = function () {
    console.log("New event:", arguments);
    Array.prototype.push.apply(this, arguments);
};
```

### **2. Use GTM Preview Mode**

1. Go to GTM → Preview
2. Enter your website URL
3. You'll see all events firing in real-time
4. Check which tags fire for each event

### **3. Development Mode Console Logs**

In development, all GTM events are logged to console:

```
[GTM Data Layer] {
  event: "view_item",
  ecommerce: { ... }
}
```

---

## ✅ Best Practices Checklist

- [x] GTM ID stored in environment variable
- [x] Data layer initializes before GTM
- [x] Type-safe event tracking
- [x] Development mode doesn't send to GTM
- [x] Error handling in place
- [x] User context automatically updated
- [x] Page views automatically tracked
- [x] Authentication events tracked
- [x] Enhanced Ecommerce implemented
- [x] Centralized utility functions
- [ ] Facebook Pixel added through GTM (Action Required)
- [ ] GA4 property configured in GTM (Action Required)
- [ ] GTM triggers and tags set up (Action Required)

---

## 📈 What You'll See in GTM Debug Mode

When you enable GTM Preview and navigate your site, you'll see events like:

1. **On Page Load:**

    ```
    page_view → {
      page: { title, path, type: "homepage" },
      user: { id, role }
    }
    ```

2. **On Course Page:**

    ```
    page_view → { pageType: "course_detail" }
    view_item → { ecommerce: { items: [...] } }
    ```

3. **On Enroll Click:**

    ```
    add_to_cart → { ecommerce: { value: 8000 } }
    ```

4. **On Login:**
    ```
    login → { user_id: "..." }
    ```

This matches the screenshot you shared - proper dynamic data layer with event firing!

---

## 🎓 Next Steps

1. **Test in Development**: Run `npm run dev` and check console logs
2. **Enable GTM Preview**: Test with GTM debugging enabled
3. **Add Facebook Pixel**: Migrate to GTM container
4. **Configure GA4**: Set up GA4 property and tags
5. **Deploy to Production**: Verify tracking in Google Analytics

---

## 📞 Support

If you need help with GTM setup:

- Check GTM documentation: https://support.google.com/tagmanager
- GA4 Enhanced Ecommerce: https://developers.google.com/analytics/devguides/collection/ga4/ecommerce

---

**Implementation Date**: March 5, 2026  
**Version**: 1.0.0  
**Status**: ✅ Complete - Ready for GTM Configuration
