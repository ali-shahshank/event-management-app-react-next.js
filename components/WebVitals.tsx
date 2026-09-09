'use client';

import { useReportWebVitals } from 'next/web-vitals';
import posthog from 'posthog-js';

export function WebVitals() {
  useReportWebVitals((metric) => {
    posthog.capture('web_vitals', {
      metric_name: metric.name,
      metric_value: metric.value,
      metric_id: metric.id,
      metric_rating: metric.rating,
      navigation_type: metric.navigationType,
    });
  });

  return null;
}
