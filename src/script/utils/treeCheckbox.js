// Handle checkbox
function handleCheckboxChange(event) {
  const checkbox = event.target;
  const parent = checkbox.closest('.list');

  // Change all child checkboxes
  const childCheckboxes = parent.querySelectorAll('.items input[type="checkbox"]');
  childCheckboxes.forEach((childCheckbox) => {
    childCheckbox.checked = checkbox.checked;
  });

  // Uncheck parent if all children are not checked
  if (!checkbox.checked) {
    let allChildrenUnchecked = Array.from(childCheckboxes).every((cb) => !cb.checked);
    if (allChildrenUnchecked && parent.parentNode.querySelector('.list input[type="checkbox"]')) {
      parent.parentNode.querySelector('.list input[type="checkbox"]').checked = false;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckboxChange);
  });
});