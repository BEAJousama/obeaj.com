

const ProjectPage = ({ params }: { params: { project: string } }) => {
    const { project } = params;
    return (
        <div>
            <h1>Project Page {project}</h1>
        </div>
    )
}

export async function generateStaticParams() {
    return [{ project: "project1" }, { project: "project2" }, { project: "project3" }];
}



export default ProjectPage;