import React, { useEffect, useRef, useState } from "react";

interface SectionRefMap {
  [key: string]: React.RefObject<HTMLElement>;
}

export function useActiveSection(sectionRefs: SectionRefMap, rootMargin = "-40% 0px -40% 0px", enableFallback = false) {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const observer = useRef<IntersectionObserver | null>(null);
  const currentId = useRef<string | null>(null);
  const hasInitialized = useRef(false);

  useEffect(() => {
    const refEntries = Object.entries(sectionRefs);
    const allAvailableSections = refEntries.every(([, ref]) => ref.current !== null);

    // Prevent multiple initializations
    if (hasInitialized.current) return;

    if(allAvailableSections) {
      hasInitialized.current = true;
      initializeObserver();
    } else {
      // Wait until all refs are assigned
      const mo = new MutationObserver(() => {
        const ready = refEntries.every(([, ref]) => ref.current !== null);
        if (ready) {
          mo.disconnect();
          hasInitialized.current = true;
          initializeObserver();
        }
      });
      mo.observe(document.body, {
        childList: true,
        subtree: true,
      });
      return () => mo.disconnect();
    }

    function initializeObserver(){
      // Create observer to track visible sections
      observer.current = new IntersectionObserver(
        (observerEntries) => {
          const visibleEntries = observerEntries
            .filter(entry => entry.isIntersecting)
            .map((entry) => ({
              entry,
              area:
                entry.intersectionRect.width * entry.intersectionRect.height,
            }))
            .sort((a, b) => b.area - a.area);
  
          // Set the section with the largest visible area
          if (visibleEntries.length > 0) {
            const id = visibleEntries[0].entry.target.getAttribute("id");
            if (id && id !== currentId.current) {
              currentId.current = id;
              setActiveSection(id);
            }
          }
        },
        {
          rootMargin,
          threshold: Array.from({ length: 11 }, (_, i) => i / 10),
        }
      );
  
      // Start observing all section elements
      for (const [, ref] of refEntries) {
        if (ref.current) {
          observer.current.observe(ref.current);
        }
      }

      // Optional: fallback using requestAnimationFrame to detect visible sections on first render
      if( enableFallback) {
        requestAnimationFrame(() => {
          const visibleSections = refEntries
            .map(([key, ref]) => {
              if (!ref.current) return null;
              const rect = ref.current.getBoundingClientRect();
              const area = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0)) * rect.width;
              return { key, area };
            })
            .filter(Boolean)
            .sort((a, b) => b!.area - a!.area);
    
          if (visibleSections.length > 0) {
            const firstVisibleSection = visibleSections[0]!;
            if (firstVisibleSection?.key !== currentId.current) {
              currentId.current = firstVisibleSection.key;
              setActiveSection(firstVisibleSection.key);
            }
          }
        });
      }
    }

    // Cleanup: unobserve all sections
    return () => {
      for (const [, ref] of refEntries) {
        if (ref.current && observer.current) {
          observer.current.unobserve(ref.current);
        }
      }
    };
  }, [sectionRefs, rootMargin]);

  return activeSection;
}