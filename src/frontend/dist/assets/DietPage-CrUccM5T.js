import { r as reactExports, h as useComposedRefs, j as jsxRuntimeExports, i as cn, b as useProfile, S as Skeleton, B as Button } from "./index-CSO-tJT7.js";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle, B as Badge } from "./index--1ePQYi4.js";
import { P as Presence, I as Input, u as ue } from "./index-CbGGG9T5.js";
import { P as Primitive, c as createContextScope, a as composeEventHandlers, u as useCallbackRef, b as useLayoutEffect2, L as Label } from "./index-DaGsvhi7.js";
import { b as useDietPlan, a as useTodayCalories, u as useFoodLogs, c as useAddFoodLog, d as useMeals, P as Progress } from "./useDiet-1nya6gvE.js";
import { u as useDirection, c as clamp } from "./index-DWnt1IDt.js";
import { S as Separator } from "./separator-CAmfc7Yt.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-CLhJ1LEX.js";
import { M as MealCategory } from "./backend.d-ULEQ2CBB.js";
import { m as motion } from "./proxy-BHC_uYLu.js";
function useStateMachine(initialState, machine) {
  return reactExports.useReducer((state, event) => {
    const nextState = machine[state][event];
    return nextState ?? state;
  }, initialState);
}
var SCROLL_AREA_NAME = "ScrollArea";
var [createScrollAreaContext] = createContextScope(SCROLL_AREA_NAME);
var [ScrollAreaProvider, useScrollAreaContext] = createScrollAreaContext(SCROLL_AREA_NAME);
var ScrollArea$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeScrollArea,
      type = "hover",
      dir,
      scrollHideDelay = 600,
      ...scrollAreaProps
    } = props;
    const [scrollArea, setScrollArea] = reactExports.useState(null);
    const [viewport, setViewport] = reactExports.useState(null);
    const [content, setContent] = reactExports.useState(null);
    const [scrollbarX, setScrollbarX] = reactExports.useState(null);
    const [scrollbarY, setScrollbarY] = reactExports.useState(null);
    const [cornerWidth, setCornerWidth] = reactExports.useState(0);
    const [cornerHeight, setCornerHeight] = reactExports.useState(0);
    const [scrollbarXEnabled, setScrollbarXEnabled] = reactExports.useState(false);
    const [scrollbarYEnabled, setScrollbarYEnabled] = reactExports.useState(false);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setScrollArea(node));
    const direction = useDirection(dir);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      ScrollAreaProvider,
      {
        scope: __scopeScrollArea,
        type,
        dir: direction,
        scrollHideDelay,
        scrollArea,
        viewport,
        onViewportChange: setViewport,
        content,
        onContentChange: setContent,
        scrollbarX,
        onScrollbarXChange: setScrollbarX,
        scrollbarXEnabled,
        onScrollbarXEnabledChange: setScrollbarXEnabled,
        scrollbarY,
        onScrollbarYChange: setScrollbarY,
        scrollbarYEnabled,
        onScrollbarYEnabledChange: setScrollbarYEnabled,
        onCornerWidthChange: setCornerWidth,
        onCornerHeightChange: setCornerHeight,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            dir: direction,
            ...scrollAreaProps,
            ref: composedRefs,
            style: {
              position: "relative",
              // Pass corner sizes as CSS vars to reduce re-renders of context consumers
              ["--radix-scroll-area-corner-width"]: cornerWidth + "px",
              ["--radix-scroll-area-corner-height"]: cornerHeight + "px",
              ...props.style
            }
          }
        )
      }
    );
  }
);
ScrollArea$1.displayName = SCROLL_AREA_NAME;
var VIEWPORT_NAME = "ScrollAreaViewport";
var ScrollAreaViewport = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeScrollArea, children, nonce, ...viewportProps } = props;
    const context = useScrollAreaContext(VIEWPORT_NAME, __scopeScrollArea);
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, ref, context.onViewportChange);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "style",
        {
          dangerouslySetInnerHTML: {
            __html: `[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}`
          },
          nonce
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.div,
        {
          "data-radix-scroll-area-viewport": "",
          ...viewportProps,
          ref: composedRefs,
          style: {
            /**
             * We don't support `visible` because the intention is to have at least one scrollbar
             * if this component is used and `visible` will behave like `auto` in that case
             * https://developer.mozilla.org/en-US/docs/Web/CSS/overflow#description
             *
             * We don't handle `auto` because the intention is for the native implementation
             * to be hidden if using this component. We just want to ensure the node is scrollable
             * so could have used either `scroll` or `auto` here. We picked `scroll` to prevent
             * the browser from having to work out whether to render native scrollbars or not,
             * we tell it to with the intention of hiding them in CSS.
             */
            overflowX: context.scrollbarXEnabled ? "scroll" : "hidden",
            overflowY: context.scrollbarYEnabled ? "scroll" : "hidden",
            ...props.style
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: context.onContentChange, style: { minWidth: "100%", display: "table" }, children })
        }
      )
    ] });
  }
);
ScrollAreaViewport.displayName = VIEWPORT_NAME;
var SCROLLBAR_NAME = "ScrollAreaScrollbar";
var ScrollAreaScrollbar = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { forceMount, ...scrollbarProps } = props;
    const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
    const { onScrollbarXEnabledChange, onScrollbarYEnabledChange } = context;
    const isHorizontal = props.orientation === "horizontal";
    reactExports.useEffect(() => {
      isHorizontal ? onScrollbarXEnabledChange(true) : onScrollbarYEnabledChange(true);
      return () => {
        isHorizontal ? onScrollbarXEnabledChange(false) : onScrollbarYEnabledChange(false);
      };
    }, [isHorizontal, onScrollbarXEnabledChange, onScrollbarYEnabledChange]);
    return context.type === "hover" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollAreaScrollbarHover, { ...scrollbarProps, ref: forwardedRef, forceMount }) : context.type === "scroll" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollAreaScrollbarScroll, { ...scrollbarProps, ref: forwardedRef, forceMount }) : context.type === "auto" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollAreaScrollbarAuto, { ...scrollbarProps, ref: forwardedRef, forceMount }) : context.type === "always" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollAreaScrollbarVisible, { ...scrollbarProps, ref: forwardedRef }) : null;
  }
);
ScrollAreaScrollbar.displayName = SCROLLBAR_NAME;
var ScrollAreaScrollbarHover = reactExports.forwardRef((props, forwardedRef) => {
  const { forceMount, ...scrollbarProps } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const [visible, setVisible] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const scrollArea = context.scrollArea;
    let hideTimer = 0;
    if (scrollArea) {
      const handlePointerEnter = () => {
        window.clearTimeout(hideTimer);
        setVisible(true);
      };
      const handlePointerLeave = () => {
        hideTimer = window.setTimeout(() => setVisible(false), context.scrollHideDelay);
      };
      scrollArea.addEventListener("pointerenter", handlePointerEnter);
      scrollArea.addEventListener("pointerleave", handlePointerLeave);
      return () => {
        window.clearTimeout(hideTimer);
        scrollArea.removeEventListener("pointerenter", handlePointerEnter);
        scrollArea.removeEventListener("pointerleave", handlePointerLeave);
      };
    }
  }, [context.scrollArea, context.scrollHideDelay]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || visible, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollAreaScrollbarAuto,
    {
      "data-state": visible ? "visible" : "hidden",
      ...scrollbarProps,
      ref: forwardedRef
    }
  ) });
});
var ScrollAreaScrollbarScroll = reactExports.forwardRef((props, forwardedRef) => {
  const { forceMount, ...scrollbarProps } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const isHorizontal = props.orientation === "horizontal";
  const debounceScrollEnd = useDebounceCallback(() => send("SCROLL_END"), 100);
  const [state, send] = useStateMachine("hidden", {
    hidden: {
      SCROLL: "scrolling"
    },
    scrolling: {
      SCROLL_END: "idle",
      POINTER_ENTER: "interacting"
    },
    interacting: {
      SCROLL: "interacting",
      POINTER_LEAVE: "idle"
    },
    idle: {
      HIDE: "hidden",
      SCROLL: "scrolling",
      POINTER_ENTER: "interacting"
    }
  });
  reactExports.useEffect(() => {
    if (state === "idle") {
      const hideTimer = window.setTimeout(() => send("HIDE"), context.scrollHideDelay);
      return () => window.clearTimeout(hideTimer);
    }
  }, [state, context.scrollHideDelay, send]);
  reactExports.useEffect(() => {
    const viewport = context.viewport;
    const scrollDirection = isHorizontal ? "scrollLeft" : "scrollTop";
    if (viewport) {
      let prevScrollPos = viewport[scrollDirection];
      const handleScroll = () => {
        const scrollPos = viewport[scrollDirection];
        const hasScrollInDirectionChanged = prevScrollPos !== scrollPos;
        if (hasScrollInDirectionChanged) {
          send("SCROLL");
          debounceScrollEnd();
        }
        prevScrollPos = scrollPos;
      };
      viewport.addEventListener("scroll", handleScroll);
      return () => viewport.removeEventListener("scroll", handleScroll);
    }
  }, [context.viewport, isHorizontal, send, debounceScrollEnd]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || state !== "hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollAreaScrollbarVisible,
    {
      "data-state": state === "hidden" ? "hidden" : "visible",
      ...scrollbarProps,
      ref: forwardedRef,
      onPointerEnter: composeEventHandlers(props.onPointerEnter, () => send("POINTER_ENTER")),
      onPointerLeave: composeEventHandlers(props.onPointerLeave, () => send("POINTER_LEAVE"))
    }
  ) });
});
var ScrollAreaScrollbarAuto = reactExports.forwardRef((props, forwardedRef) => {
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const { forceMount, ...scrollbarProps } = props;
  const [visible, setVisible] = reactExports.useState(false);
  const isHorizontal = props.orientation === "horizontal";
  const handleResize = useDebounceCallback(() => {
    if (context.viewport) {
      const isOverflowX = context.viewport.offsetWidth < context.viewport.scrollWidth;
      const isOverflowY = context.viewport.offsetHeight < context.viewport.scrollHeight;
      setVisible(isHorizontal ? isOverflowX : isOverflowY);
    }
  }, 10);
  useResizeObserver(context.viewport, handleResize);
  useResizeObserver(context.content, handleResize);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || visible, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollAreaScrollbarVisible,
    {
      "data-state": visible ? "visible" : "hidden",
      ...scrollbarProps,
      ref: forwardedRef
    }
  ) });
});
var ScrollAreaScrollbarVisible = reactExports.forwardRef((props, forwardedRef) => {
  const { orientation = "vertical", ...scrollbarProps } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const thumbRef = reactExports.useRef(null);
  const pointerOffsetRef = reactExports.useRef(0);
  const [sizes, setSizes] = reactExports.useState({
    content: 0,
    viewport: 0,
    scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 }
  });
  const thumbRatio = getThumbRatio(sizes.viewport, sizes.content);
  const commonProps = {
    ...scrollbarProps,
    sizes,
    onSizesChange: setSizes,
    hasThumb: Boolean(thumbRatio > 0 && thumbRatio < 1),
    onThumbChange: (thumb) => thumbRef.current = thumb,
    onThumbPointerUp: () => pointerOffsetRef.current = 0,
    onThumbPointerDown: (pointerPos) => pointerOffsetRef.current = pointerPos
  };
  function getScrollPosition(pointerPos, dir) {
    return getScrollPositionFromPointer(pointerPos, pointerOffsetRef.current, sizes, dir);
  }
  if (orientation === "horizontal") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      ScrollAreaScrollbarX,
      {
        ...commonProps,
        ref: forwardedRef,
        onThumbPositionChange: () => {
          if (context.viewport && thumbRef.current) {
            const scrollPos = context.viewport.scrollLeft;
            const offset = getThumbOffsetFromScroll(scrollPos, sizes, context.dir);
            thumbRef.current.style.transform = `translate3d(${offset}px, 0, 0)`;
          }
        },
        onWheelScroll: (scrollPos) => {
          if (context.viewport) context.viewport.scrollLeft = scrollPos;
        },
        onDragScroll: (pointerPos) => {
          if (context.viewport) {
            context.viewport.scrollLeft = getScrollPosition(pointerPos, context.dir);
          }
        }
      }
    );
  }
  if (orientation === "vertical") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      ScrollAreaScrollbarY,
      {
        ...commonProps,
        ref: forwardedRef,
        onThumbPositionChange: () => {
          if (context.viewport && thumbRef.current) {
            const scrollPos = context.viewport.scrollTop;
            const offset = getThumbOffsetFromScroll(scrollPos, sizes);
            thumbRef.current.style.transform = `translate3d(0, ${offset}px, 0)`;
          }
        },
        onWheelScroll: (scrollPos) => {
          if (context.viewport) context.viewport.scrollTop = scrollPos;
        },
        onDragScroll: (pointerPos) => {
          if (context.viewport) context.viewport.scrollTop = getScrollPosition(pointerPos);
        }
      }
    );
  }
  return null;
});
var ScrollAreaScrollbarX = reactExports.forwardRef((props, forwardedRef) => {
  const { sizes, onSizesChange, ...scrollbarProps } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const [computedStyle, setComputedStyle] = reactExports.useState();
  const ref = reactExports.useRef(null);
  const composeRefs = useComposedRefs(forwardedRef, ref, context.onScrollbarXChange);
  reactExports.useEffect(() => {
    if (ref.current) setComputedStyle(getComputedStyle(ref.current));
  }, [ref]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollAreaScrollbarImpl,
    {
      "data-orientation": "horizontal",
      ...scrollbarProps,
      ref: composeRefs,
      sizes,
      style: {
        bottom: 0,
        left: context.dir === "rtl" ? "var(--radix-scroll-area-corner-width)" : 0,
        right: context.dir === "ltr" ? "var(--radix-scroll-area-corner-width)" : 0,
        ["--radix-scroll-area-thumb-width"]: getThumbSize(sizes) + "px",
        ...props.style
      },
      onThumbPointerDown: (pointerPos) => props.onThumbPointerDown(pointerPos.x),
      onDragScroll: (pointerPos) => props.onDragScroll(pointerPos.x),
      onWheelScroll: (event, maxScrollPos) => {
        if (context.viewport) {
          const scrollPos = context.viewport.scrollLeft + event.deltaX;
          props.onWheelScroll(scrollPos);
          if (isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos)) {
            event.preventDefault();
          }
        }
      },
      onResize: () => {
        if (ref.current && context.viewport && computedStyle) {
          onSizesChange({
            content: context.viewport.scrollWidth,
            viewport: context.viewport.offsetWidth,
            scrollbar: {
              size: ref.current.clientWidth,
              paddingStart: toInt(computedStyle.paddingLeft),
              paddingEnd: toInt(computedStyle.paddingRight)
            }
          });
        }
      }
    }
  );
});
var ScrollAreaScrollbarY = reactExports.forwardRef((props, forwardedRef) => {
  const { sizes, onSizesChange, ...scrollbarProps } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const [computedStyle, setComputedStyle] = reactExports.useState();
  const ref = reactExports.useRef(null);
  const composeRefs = useComposedRefs(forwardedRef, ref, context.onScrollbarYChange);
  reactExports.useEffect(() => {
    if (ref.current) setComputedStyle(getComputedStyle(ref.current));
  }, [ref]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollAreaScrollbarImpl,
    {
      "data-orientation": "vertical",
      ...scrollbarProps,
      ref: composeRefs,
      sizes,
      style: {
        top: 0,
        right: context.dir === "ltr" ? 0 : void 0,
        left: context.dir === "rtl" ? 0 : void 0,
        bottom: "var(--radix-scroll-area-corner-height)",
        ["--radix-scroll-area-thumb-height"]: getThumbSize(sizes) + "px",
        ...props.style
      },
      onThumbPointerDown: (pointerPos) => props.onThumbPointerDown(pointerPos.y),
      onDragScroll: (pointerPos) => props.onDragScroll(pointerPos.y),
      onWheelScroll: (event, maxScrollPos) => {
        if (context.viewport) {
          const scrollPos = context.viewport.scrollTop + event.deltaY;
          props.onWheelScroll(scrollPos);
          if (isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos)) {
            event.preventDefault();
          }
        }
      },
      onResize: () => {
        if (ref.current && context.viewport && computedStyle) {
          onSizesChange({
            content: context.viewport.scrollHeight,
            viewport: context.viewport.offsetHeight,
            scrollbar: {
              size: ref.current.clientHeight,
              paddingStart: toInt(computedStyle.paddingTop),
              paddingEnd: toInt(computedStyle.paddingBottom)
            }
          });
        }
      }
    }
  );
});
var [ScrollbarProvider, useScrollbarContext] = createScrollAreaContext(SCROLLBAR_NAME);
var ScrollAreaScrollbarImpl = reactExports.forwardRef((props, forwardedRef) => {
  const {
    __scopeScrollArea,
    sizes,
    hasThumb,
    onThumbChange,
    onThumbPointerUp,
    onThumbPointerDown,
    onThumbPositionChange,
    onDragScroll,
    onWheelScroll,
    onResize,
    ...scrollbarProps
  } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, __scopeScrollArea);
  const [scrollbar, setScrollbar] = reactExports.useState(null);
  const composeRefs = useComposedRefs(forwardedRef, (node) => setScrollbar(node));
  const rectRef = reactExports.useRef(null);
  const prevWebkitUserSelectRef = reactExports.useRef("");
  const viewport = context.viewport;
  const maxScrollPos = sizes.content - sizes.viewport;
  const handleWheelScroll = useCallbackRef(onWheelScroll);
  const handleThumbPositionChange = useCallbackRef(onThumbPositionChange);
  const handleResize = useDebounceCallback(onResize, 10);
  function handleDragScroll(event) {
    if (rectRef.current) {
      const x = event.clientX - rectRef.current.left;
      const y = event.clientY - rectRef.current.top;
      onDragScroll({ x, y });
    }
  }
  reactExports.useEffect(() => {
    const handleWheel = (event) => {
      const element = event.target;
      const isScrollbarWheel = scrollbar == null ? void 0 : scrollbar.contains(element);
      if (isScrollbarWheel) handleWheelScroll(event, maxScrollPos);
    };
    document.addEventListener("wheel", handleWheel, { passive: false });
    return () => document.removeEventListener("wheel", handleWheel, { passive: false });
  }, [viewport, scrollbar, maxScrollPos, handleWheelScroll]);
  reactExports.useEffect(handleThumbPositionChange, [sizes, handleThumbPositionChange]);
  useResizeObserver(scrollbar, handleResize);
  useResizeObserver(context.content, handleResize);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollbarProvider,
    {
      scope: __scopeScrollArea,
      scrollbar,
      hasThumb,
      onThumbChange: useCallbackRef(onThumbChange),
      onThumbPointerUp: useCallbackRef(onThumbPointerUp),
      onThumbPositionChange: handleThumbPositionChange,
      onThumbPointerDown: useCallbackRef(onThumbPointerDown),
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.div,
        {
          ...scrollbarProps,
          ref: composeRefs,
          style: { position: "absolute", ...scrollbarProps.style },
          onPointerDown: composeEventHandlers(props.onPointerDown, (event) => {
            const mainPointer = 0;
            if (event.button === mainPointer) {
              const element = event.target;
              element.setPointerCapture(event.pointerId);
              rectRef.current = scrollbar.getBoundingClientRect();
              prevWebkitUserSelectRef.current = document.body.style.webkitUserSelect;
              document.body.style.webkitUserSelect = "none";
              if (context.viewport) context.viewport.style.scrollBehavior = "auto";
              handleDragScroll(event);
            }
          }),
          onPointerMove: composeEventHandlers(props.onPointerMove, handleDragScroll),
          onPointerUp: composeEventHandlers(props.onPointerUp, (event) => {
            const element = event.target;
            if (element.hasPointerCapture(event.pointerId)) {
              element.releasePointerCapture(event.pointerId);
            }
            document.body.style.webkitUserSelect = prevWebkitUserSelectRef.current;
            if (context.viewport) context.viewport.style.scrollBehavior = "";
            rectRef.current = null;
          })
        }
      )
    }
  );
});
var THUMB_NAME = "ScrollAreaThumb";
var ScrollAreaThumb = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { forceMount, ...thumbProps } = props;
    const scrollbarContext = useScrollbarContext(THUMB_NAME, props.__scopeScrollArea);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || scrollbarContext.hasThumb, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollAreaThumbImpl, { ref: forwardedRef, ...thumbProps }) });
  }
);
var ScrollAreaThumbImpl = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeScrollArea, style, ...thumbProps } = props;
    const scrollAreaContext = useScrollAreaContext(THUMB_NAME, __scopeScrollArea);
    const scrollbarContext = useScrollbarContext(THUMB_NAME, __scopeScrollArea);
    const { onThumbPositionChange } = scrollbarContext;
    const composedRef = useComposedRefs(
      forwardedRef,
      (node) => scrollbarContext.onThumbChange(node)
    );
    const removeUnlinkedScrollListenerRef = reactExports.useRef(void 0);
    const debounceScrollEnd = useDebounceCallback(() => {
      if (removeUnlinkedScrollListenerRef.current) {
        removeUnlinkedScrollListenerRef.current();
        removeUnlinkedScrollListenerRef.current = void 0;
      }
    }, 100);
    reactExports.useEffect(() => {
      const viewport = scrollAreaContext.viewport;
      if (viewport) {
        const handleScroll = () => {
          debounceScrollEnd();
          if (!removeUnlinkedScrollListenerRef.current) {
            const listener = addUnlinkedScrollListener(viewport, onThumbPositionChange);
            removeUnlinkedScrollListenerRef.current = listener;
            onThumbPositionChange();
          }
        };
        onThumbPositionChange();
        viewport.addEventListener("scroll", handleScroll);
        return () => viewport.removeEventListener("scroll", handleScroll);
      }
    }, [scrollAreaContext.viewport, debounceScrollEnd, onThumbPositionChange]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": scrollbarContext.hasThumb ? "visible" : "hidden",
        ...thumbProps,
        ref: composedRef,
        style: {
          width: "var(--radix-scroll-area-thumb-width)",
          height: "var(--radix-scroll-area-thumb-height)",
          ...style
        },
        onPointerDownCapture: composeEventHandlers(props.onPointerDownCapture, (event) => {
          const thumb = event.target;
          const thumbRect = thumb.getBoundingClientRect();
          const x = event.clientX - thumbRect.left;
          const y = event.clientY - thumbRect.top;
          scrollbarContext.onThumbPointerDown({ x, y });
        }),
        onPointerUp: composeEventHandlers(props.onPointerUp, scrollbarContext.onThumbPointerUp)
      }
    );
  }
);
ScrollAreaThumb.displayName = THUMB_NAME;
var CORNER_NAME = "ScrollAreaCorner";
var ScrollAreaCorner = reactExports.forwardRef(
  (props, forwardedRef) => {
    const context = useScrollAreaContext(CORNER_NAME, props.__scopeScrollArea);
    const hasBothScrollbarsVisible = Boolean(context.scrollbarX && context.scrollbarY);
    const hasCorner = context.type !== "scroll" && hasBothScrollbarsVisible;
    return hasCorner ? /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollAreaCornerImpl, { ...props, ref: forwardedRef }) : null;
  }
);
ScrollAreaCorner.displayName = CORNER_NAME;
var ScrollAreaCornerImpl = reactExports.forwardRef((props, forwardedRef) => {
  const { __scopeScrollArea, ...cornerProps } = props;
  const context = useScrollAreaContext(CORNER_NAME, __scopeScrollArea);
  const [width, setWidth] = reactExports.useState(0);
  const [height, setHeight] = reactExports.useState(0);
  const hasSize = Boolean(width && height);
  useResizeObserver(context.scrollbarX, () => {
    var _a;
    const height2 = ((_a = context.scrollbarX) == null ? void 0 : _a.offsetHeight) || 0;
    context.onCornerHeightChange(height2);
    setHeight(height2);
  });
  useResizeObserver(context.scrollbarY, () => {
    var _a;
    const width2 = ((_a = context.scrollbarY) == null ? void 0 : _a.offsetWidth) || 0;
    context.onCornerWidthChange(width2);
    setWidth(width2);
  });
  return hasSize ? /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.div,
    {
      ...cornerProps,
      ref: forwardedRef,
      style: {
        width,
        height,
        position: "absolute",
        right: context.dir === "ltr" ? 0 : void 0,
        left: context.dir === "rtl" ? 0 : void 0,
        bottom: 0,
        ...props.style
      }
    }
  ) : null;
});
function toInt(value) {
  return value ? parseInt(value, 10) : 0;
}
function getThumbRatio(viewportSize, contentSize) {
  const ratio = viewportSize / contentSize;
  return isNaN(ratio) ? 0 : ratio;
}
function getThumbSize(sizes) {
  const ratio = getThumbRatio(sizes.viewport, sizes.content);
  const scrollbarPadding = sizes.scrollbar.paddingStart + sizes.scrollbar.paddingEnd;
  const thumbSize = (sizes.scrollbar.size - scrollbarPadding) * ratio;
  return Math.max(thumbSize, 18);
}
function getScrollPositionFromPointer(pointerPos, pointerOffset, sizes, dir = "ltr") {
  const thumbSizePx = getThumbSize(sizes);
  const thumbCenter = thumbSizePx / 2;
  const offset = pointerOffset || thumbCenter;
  const thumbOffsetFromEnd = thumbSizePx - offset;
  const minPointerPos = sizes.scrollbar.paddingStart + offset;
  const maxPointerPos = sizes.scrollbar.size - sizes.scrollbar.paddingEnd - thumbOffsetFromEnd;
  const maxScrollPos = sizes.content - sizes.viewport;
  const scrollRange = dir === "ltr" ? [0, maxScrollPos] : [maxScrollPos * -1, 0];
  const interpolate = linearScale([minPointerPos, maxPointerPos], scrollRange);
  return interpolate(pointerPos);
}
function getThumbOffsetFromScroll(scrollPos, sizes, dir = "ltr") {
  const thumbSizePx = getThumbSize(sizes);
  const scrollbarPadding = sizes.scrollbar.paddingStart + sizes.scrollbar.paddingEnd;
  const scrollbar = sizes.scrollbar.size - scrollbarPadding;
  const maxScrollPos = sizes.content - sizes.viewport;
  const maxThumbPos = scrollbar - thumbSizePx;
  const scrollClampRange = dir === "ltr" ? [0, maxScrollPos] : [maxScrollPos * -1, 0];
  const scrollWithoutMomentum = clamp(scrollPos, scrollClampRange);
  const interpolate = linearScale([0, maxScrollPos], [0, maxThumbPos]);
  return interpolate(scrollWithoutMomentum);
}
function linearScale(input, output) {
  return (value) => {
    if (input[0] === input[1] || output[0] === output[1]) return output[0];
    const ratio = (output[1] - output[0]) / (input[1] - input[0]);
    return output[0] + ratio * (value - input[0]);
  };
}
function isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos) {
  return scrollPos > 0 && scrollPos < maxScrollPos;
}
var addUnlinkedScrollListener = (node, handler = () => {
}) => {
  let prevPosition = { left: node.scrollLeft, top: node.scrollTop };
  let rAF = 0;
  (function loop() {
    const position = { left: node.scrollLeft, top: node.scrollTop };
    const isHorizontalScroll = prevPosition.left !== position.left;
    const isVerticalScroll = prevPosition.top !== position.top;
    if (isHorizontalScroll || isVerticalScroll) handler();
    prevPosition = position;
    rAF = window.requestAnimationFrame(loop);
  })();
  return () => window.cancelAnimationFrame(rAF);
};
function useDebounceCallback(callback, delay) {
  const handleCallback = useCallbackRef(callback);
  const debounceTimerRef = reactExports.useRef(0);
  reactExports.useEffect(() => () => window.clearTimeout(debounceTimerRef.current), []);
  return reactExports.useCallback(() => {
    window.clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = window.setTimeout(handleCallback, delay);
  }, [handleCallback, delay]);
}
function useResizeObserver(element, onResize) {
  const handleResize = useCallbackRef(onResize);
  useLayoutEffect2(() => {
    let rAF = 0;
    if (element) {
      const resizeObserver = new ResizeObserver(() => {
        cancelAnimationFrame(rAF);
        rAF = window.requestAnimationFrame(handleResize);
      });
      resizeObserver.observe(element);
      return () => {
        window.cancelAnimationFrame(rAF);
        resizeObserver.unobserve(element);
      };
    }
  }, [element, handleResize]);
}
var Root = ScrollArea$1;
var Viewport = ScrollAreaViewport;
var Corner = ScrollAreaCorner;
function ScrollArea({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Root,
    {
      "data-slot": "scroll-area",
      className: cn("relative", className),
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Viewport,
          {
            "data-slot": "scroll-area-viewport",
            className: "focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1",
            children
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollBar, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Corner, {})
      ]
    }
  );
}
function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollAreaScrollbar,
    {
      "data-slot": "scroll-area-scrollbar",
      orientation,
      className: cn(
        "flex touch-none p-px transition-colors select-none",
        orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent",
        orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        ScrollAreaThumb,
        {
          "data-slot": "scroll-area-thumb",
          className: "bg-border relative flex-1 rounded-full"
        }
      )
    }
  );
}
function MacroBar({
  protein,
  carbs,
  fat
}) {
  const total = protein + carbs + fat || 1;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-2 w-full overflow-hidden rounded-full bg-muted gap-px", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        style: {
          width: `${protein / total * 100}%`,
          background: "hsl(var(--chart-2))"
        },
        className: "rounded-l-full transition-smooth",
        title: `Protein ${protein}g`
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        style: {
          width: `${carbs / total * 100}%`,
          background: "hsl(var(--chart-4))"
        },
        className: "transition-smooth",
        title: `Carbs ${carbs}g`
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        style: {
          width: `${fat / total * 100}%`,
          background: "hsl(var(--destructive))"
        },
        className: "rounded-r-full transition-smooth",
        title: `Fat ${fat}g`
      }
    )
  ] });
}
function MealCard({
  id,
  name,
  calories,
  proteinG,
  carbsG,
  fatG,
  prepTimeMinutes,
  isVegetarian,
  category,
  onAddToLog,
  index
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: index * 0.05 },
      "data-ocid": `meal.item.${index + 1}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "card-elevated h-full flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-2 space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-base leading-tight", children: name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: `shrink-0 text-xs font-medium ${isVegetarian ? "border-primary/40 text-primary bg-primary/10" : "border-accent/40 text-accent bg-accent/10"}`,
                children: isVegetarian ? "Veg" : "Non-Veg"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: category }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-xs", children: [
              Number(prepTimeMinutes),
              " min prep"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex-1 flex flex-col gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-bold font-display text-foreground", children: Number(calories) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm", children: "kcal" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(MacroBar, { protein: proteinG, carbs: carbsG, fat: fatG }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "w-2 h-2 rounded-full inline-block",
                  style: { background: "hsl(var(--chart-2))" }
                }
              ),
              "P ",
              proteinG,
              "g"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "w-2 h-2 rounded-full inline-block",
                  style: { background: "hsl(var(--chart-4))" }
                }
              ),
              "C ",
              carbsG,
              "g"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "w-2 h-2 rounded-full inline-block",
                  style: { background: "hsl(var(--destructive))" }
                }
              ),
              "F ",
              fatG,
              "g"
            ] })
          ] }),
          onAddToLog && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "mt-auto w-full border-primary/30 text-primary hover:bg-primary/10 transition-smooth",
              onClick: () => onAddToLog(id, name, calories),
              "data-ocid": `meal.add_button.${index + 1}`,
              children: "+ Add to Log"
            }
          )
        ] })
      ] })
    }
  );
}
const CATEGORIES = [
  "All",
  MealCategory.Breakfast,
  MealCategory.Lunch,
  MealCategory.Dinner,
  MealCategory.Snack
];
function DietPage() {
  const { data: profile } = useProfile();
  const { data: dietPlan, isLoading: planLoading } = useDietPlan();
  const { data: todayCalories, isLoading: calLoading } = useTodayCalories();
  const { data: foodLogs, isLoading: logsLoading } = useFoodLogs();
  const addFoodLog = useAddFoodLog();
  const [planVeg, setPlanVeg] = reactExports.useState(null);
  const [libVeg, setLibVeg] = reactExports.useState(null);
  const [libCategory, setLibCategory] = reactExports.useState(null);
  const { data: libraryMeals, isLoading: libLoading } = useMeals(
    libVeg,
    libCategory
  );
  const [logMealName, setLogMealName] = reactExports.useState("");
  const [logCalories, setLogCalories] = reactExports.useState("");
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const dailyTarget = Number(
    (dietPlan == null ? void 0 : dietPlan.dailyCaloricTarget) ?? (profile == null ? void 0 : profile.goal) ? 2200 : 2e3
  );
  const consumed = Number(todayCalories ?? 0);
  const progressPct = Math.min(100, Math.round(consumed / dailyTarget * 100));
  const remaining = Math.max(0, dailyTarget - consumed);
  const planMeals = ((dietPlan == null ? void 0 : dietPlan.meals) ?? []).filter(
    (m) => planVeg === null ? true : m.isVegetarian === planVeg
  );
  const grouped = [
    MealCategory.Breakfast,
    MealCategory.Lunch,
    MealCategory.Dinner,
    MealCategory.Snack
  ].reduce((acc, cat) => {
    acc[cat] = planMeals.filter((m) => m.category === cat);
    return acc;
  }, {});
  async function handleAddToLog(_id, name, calories) {
    try {
      await addFoodLog.mutateAsync({ mealName: name, calories });
      ue.success(`${name} added to your food log!`, { duration: 4e3 });
    } catch {
      ue.error("Failed to add meal to log. Please try again.");
    }
  }
  async function handleManualLog(e) {
    e.preventDefault();
    if (!logMealName.trim() || !logCalories) return;
    setIsSubmitting(true);
    try {
      await addFoodLog.mutateAsync({
        mealName: logMealName.trim(),
        calories: BigInt(Math.round(Number(logCalories)))
      });
      ue.success("Entry added to your food log!", { duration: 4e3 });
      setLogMealName("");
      setLogCalories("");
    } catch {
      ue.error("Failed to save food log entry.");
    } finally {
      setIsSubmitting(false);
    }
  }
  function formatTimestamp(ts) {
    const ms = Number(ts) / 1e6;
    return new Date(ms).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });
  }
  const totalLoggedCals = (foodLogs ?? []).reduce(
    (sum, e) => sum + Number(e.calories),
    0
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-full bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6 py-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: -12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-foreground", children: "Diet & Nutrition" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Track your meals, hit your caloric goals, and stay on plan." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.15 },
          className: "mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4",
          "data-ocid": "diet.header.section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-primary/10 border-primary/20 col-span-1 sm:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4 pb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Today's Progress" }),
                  calLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-40 mt-1" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold font-display text-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: consumed.toLocaleString() }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground text-lg", children: [
                      " ",
                      "/ ",
                      dailyTarget.toLocaleString(),
                      " kcal"
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Remaining" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xl font-bold font-display text-accent", children: [
                    remaining.toLocaleString(),
                    " kcal"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Progress,
                {
                  value: progressPct,
                  className: "h-3",
                  "data-ocid": "diet.calories_progress"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1 text-right", children: [
                progressPct,
                "% of daily target"
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4 pb-4 h-full flex flex-col justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Daily Target" }),
              planLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-28 mt-2" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold font-display text-foreground mt-2", children: dailyTarget.toLocaleString() }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "kcal/day" })
            ] }) })
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-6 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "plan", "data-ocid": "diet.tabs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "mb-6 bg-muted/40 border border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          TabsTrigger,
          {
            value: "plan",
            "data-ocid": "diet.plan.tab",
            className: "font-medium",
            children: "My Diet Plan"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          TabsTrigger,
          {
            value: "library",
            "data-ocid": "diet.library.tab",
            className: "font-medium",
            children: "Meal Library"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          TabsTrigger,
          {
            value: "log",
            "data-ocid": "diet.log.tab",
            className: "font-medium",
            children: "Food Log"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "plan", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-2 mb-6",
            "data-ocid": "diet.plan.filter",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground mr-1", children: "Filter:" }),
              [
                { label: "All", value: null },
                { label: "🥦 Vegetarian", value: true },
                { label: "🍗 Non-Veg", value: false }
              ].map(({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: planVeg === value ? "default" : "outline",
                  size: "sm",
                  className: "transition-smooth",
                  onClick: () => setPlanVeg(value),
                  "data-ocid": `diet.plan.filter_${label.toLowerCase().replace(/\s|🥦|🍗/g, "")}`,
                  children: label
                },
                label
              ))
            ]
          }
        ),
        planLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: ["sk-p1", "sk-p2", "sk-p3", "sk-p4", "sk-p5", "sk-p6"].map(
          (k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-52 rounded-xl" }, k)
        ) }) : !dietPlan ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            className: "text-center py-20",
            "data-ocid": "diet.plan.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-6xl mb-4", children: "🥗" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-semibold text-foreground mb-2", children: "No plan generated yet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6 max-w-sm mx-auto", children: "Complete your health profile to get a personalized diet plan tailored to your goals." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "default", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: "/health?onboarding=true",
                  "data-ocid": "diet.plan.empty_cta",
                  children: "Complete Profile"
                }
              ) })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
          Object.entries(grouped).map(
            ([cat, meals]) => meals.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "section",
              {
                "data-ocid": `diet.plan.${cat.toLowerCase()}_section`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-lg font-semibold text-foreground mb-3 flex items-center gap-2", children: [
                    cat === MealCategory.Breakfast && "🌅",
                    cat === MealCategory.Lunch && "☀️",
                    cat === MealCategory.Dinner && "🌙",
                    cat === MealCategory.Snack && "🍎",
                    cat
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4", children: meals.map((meal, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    MealCard,
                    {
                      ...meal,
                      index: i,
                      onAddToLog: handleAddToLog
                    },
                    String(meal.id)
                  )) })
                ]
              },
              cat
            )
          ),
          planMeals.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "text-center py-16 text-muted-foreground",
              "data-ocid": "diet.plan.filtered_empty_state",
              children: 'No meals match the current filter. Try switching to "All".'
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "library", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-wrap items-center gap-3 mb-6",
            "data-ocid": "diet.library.filters",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Diet:" }),
                [
                  { label: "All", value: null },
                  { label: "🥦 Veg", value: true },
                  { label: "🍗 Non-Veg", value: false }
                ].map(({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: libVeg === value ? "default" : "outline",
                    size: "sm",
                    className: "transition-smooth",
                    onClick: () => setLibVeg(value),
                    "data-ocid": `diet.library.diet_${label.toLowerCase().replace(/\s|🥦|🍗/g, "")}`,
                    children: label
                  },
                  label
                ))
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Separator,
                {
                  orientation: "vertical",
                  className: "h-6 hidden sm:block"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Category:" }),
                CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: (cat === "All" ? libCategory === null : libCategory === cat) ? "default" : "outline",
                    size: "sm",
                    className: "transition-smooth",
                    onClick: () => setLibCategory(cat === "All" ? null : cat),
                    "data-ocid": `diet.library.cat_${cat.toLowerCase()}`,
                    children: cat
                  },
                  cat
                ))
              ] })
            ]
          }
        ),
        libLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4", children: [
          "sk-l1",
          "sk-l2",
          "sk-l3",
          "sk-l4",
          "sk-l5",
          "sk-l6",
          "sk-l7",
          "sk-l8"
        ].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-52 rounded-xl" }, k)) }) : (libraryMeals ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "text-center py-16 text-muted-foreground",
            "data-ocid": "diet.library.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl mb-3", children: "🔍" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No meals found for the selected filters." })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4",
            "data-ocid": "diet.library.list",
            children: (libraryMeals ?? []).map((meal, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              MealCard,
              {
                ...meal,
                index: i,
                onAddToLog: handleAddToLog
              },
              String(meal.id)
            ))
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "log", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "card-elevated sticky top-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-lg", children: "Log a Meal" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "form",
            {
              onSubmit: handleManualLog,
              className: "space-y-4",
              "data-ocid": "diet.log.form",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "meal-name", children: "Meal Name" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "meal-name",
                      placeholder: "e.g. Grilled Chicken Salad",
                      value: logMealName,
                      onChange: (e) => setLogMealName(e.target.value),
                      required: true,
                      "data-ocid": "diet.log.meal_name.input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "calories", children: "Calories (kcal)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "calories",
                      type: "number",
                      min: 0,
                      max: 9999,
                      placeholder: "e.g. 450",
                      value: logCalories,
                      onChange: (e) => setLogCalories(e.target.value),
                      required: true,
                      "data-ocid": "diet.log.calories.input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "submit",
                    className: "w-full transition-smooth",
                    disabled: isSubmitting || !logMealName.trim() || !logCalories,
                    "data-ocid": "diet.log.submit_button",
                    children: isSubmitting ? "Saving…" : "Add Entry"
                  }
                ),
                isSubmitting && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs text-muted-foreground text-center",
                    "data-ocid": "diet.log.loading_state",
                    children: "Saving your entry…"
                  }
                )
              ]
            }
          ) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground", children: "Today's Entries" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Badge,
              {
                variant: "secondary",
                className: "text-sm font-semibold",
                "data-ocid": "diet.log.total_badge",
                children: [
                  totalLoggedCals.toLocaleString(),
                  " kcal total"
                ]
              }
            )
          ] }),
          logsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: ["sk-e1", "sk-e2", "sk-e3", "sk-e4"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 rounded-lg" }, k)) }) : (foodLogs ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            Card,
            {
              className: "border-dashed border-border",
              "data-ocid": "diet.log.empty_state",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "text-center py-12", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl mb-3", children: "📋" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-base font-medium text-foreground mb-1", children: "No meals logged today" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Use the form to add your first entry." })
              ] })
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "h-[480px] pr-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", "data-ocid": "diet.log.list", children: (foodLogs ?? []).map((entry, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, x: -12 },
              animate: { opacity: 1, x: 0 },
              transition: { delay: i * 0.04 },
              "data-ocid": `diet.log.item.${i + 1}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "py-3 px-4 flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground truncate", children: entry.mealName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: formatTimestamp(entry.timestamp) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Badge,
                  {
                    variant: "outline",
                    className: "ml-3 shrink-0 text-primary border-primary/30 bg-primary/10 font-semibold",
                    children: [
                      Number(entry.calories).toLocaleString(),
                      " kcal"
                    ]
                  }
                )
              ] }) })
            },
            String(entry.id)
          )) }) }),
          (foodLogs ?? []).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Card,
            {
              className: "bg-muted/30 border-border",
              "data-ocid": "diet.log.summary",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "py-3 px-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Total logged today" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold font-display text-foreground text-lg", children: [
                    totalLoggedCals.toLocaleString(),
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-normal text-muted-foreground", children: "kcal" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-2" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Daily target" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground font-medium", children: [
                    dailyTarget.toLocaleString(),
                    " kcal"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm mt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Remaining" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `font-semibold ${remaining === 0 ? "text-accent" : "text-primary"}`,
                      children: remaining === 0 ? "Goal reached! 🎉" : `${remaining.toLocaleString()} kcal`
                    }
                  )
                ] })
              ] })
            }
          )
        ] })
      ] }) })
    ] }) })
  ] });
}
export {
  DietPage as default
};
