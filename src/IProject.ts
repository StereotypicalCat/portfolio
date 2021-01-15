export default interface Project {
    renderOrder: number,
    title: string,
    description: string,
    tags: string[],
    github?: string,
    livedemo?: string,
    academics?: string
}