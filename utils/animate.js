const animateElementsOnView = (elements, animation) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle(animation, entry.isIntersecting);
        if (entry.isIntersecting) observer.unobserve(entry.target);
      });
    },
    { threshold: 0 }
  );
  elements.forEach((el) => observer.observe(el));
};

export { animateElementsOnView };
