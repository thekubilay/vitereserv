import { Room } from "@/types/Building";
import {ImageProject, Project, ProjectGallery} from "@/types/Project";
import {Salon} from "@/types/Salon";

export interface State {
  project: Project | null,
  salon: Salon | ProjectGallery[] | null
  appLoading: boolean,
  contentLoading: boolean,
  showNavBar: boolean,
  dataType: string,
  direction: string|null,
  room: Room | null
}

export function state(): State {
  return {
    project: null,
    salon: null,
    appLoading: false as boolean,
    contentLoading: false as boolean,
    showNavBar: true as boolean,
    dataType: "projectType" as string,
    direction: null,
    room: null
  }
}
