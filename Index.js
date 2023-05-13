var switch_ = !true;

show_.addEventListener('click', () => {
    switch_ = !switch_;
    subheading.style.display = switch_ ? "flex" : 'none';
    show_.innerHTML = switch_ ? "less..." : 'more...'
})