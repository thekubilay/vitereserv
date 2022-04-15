import { Vacancy } from "@/types/Room"
// import {ImageProject, Project, ProjectGallery} from "@/types/Project";
// import {Salon} from "@/types/Salon";

export interface State {
  vacancy: Vacancy | null,
  // project: Project | null,
  // salon: Salon | ProjectGallery[] | null
  // appLoading: boolean,
  // contentLoading: boolean,
  // showNavBar: boolean,
  // dataType: string,
  // direction: string|null,
  // room: Room | null
}

export function state(): State {
  return {
    vacancy: null
    // project: null,
    // salon: null,
    // appLoading: false as boolean,
    // contentLoading: false as boolean,
    // showNavBar: true as boolean,
    // dataType: "projectType" as string,
    // direction: null,
    // room: null
  }
}
