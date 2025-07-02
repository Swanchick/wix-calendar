class Arrow {
    private arrow: HTMLElement | null = document.getElementById(ARROW_ID);
    
    setPosition(percentage: number) {
        if (this.arrow === null) {
            this.arrow = document.getElementById(ARROW_ID);
            
            return;
        }

        this.arrow.style.top = `${percentage}%`;
    }
}
