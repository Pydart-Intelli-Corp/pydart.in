export const smoothScrollTo = (elementId: string) => {
  if (elementId === 'top') {
    // Scroll to the very top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  } else {
    const element = document.getElementById(elementId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }
};
