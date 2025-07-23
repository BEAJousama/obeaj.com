

export const getPageColor = (page: string) => {
    const colors = {
        home: '#00ffff',     // Cyan
        about: '#07CE9B',    // Spring green
        projects: '#0066ff', // Blue
        contact: '#00FFCC',
        resume: '#0066ff',
        experience: '#0045ff'
    }
    
    switch (page) {
        case "home":
            return colors.home;
        case "about":
            return colors.about;
        case "projects":
            return colors.projects;
        case "experience":
            return colors.resume;
        case "contact":
            return colors.contact;
        case "resume":
            return colors.resume;
        default:
            return colors.home;
    }
}

