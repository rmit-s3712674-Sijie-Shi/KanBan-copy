function Detail(description, startTime, endTime) {
    this.description = description;
    this.startTime = startTime;
    this.endTime = endTime;
}


export function TaskTemplate(taskName, id, detail){
    this.taskName = taskName;
    this.id = id;
    this.detail = new Detail(detail.description, detail.startTime, detail.endTime);
}


