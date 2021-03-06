import React, {Component} from "react";

import {library} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {fab} from '@fortawesome/free-brands-svg-icons'
import {fas} from "@fortawesome/free-solid-svg-icons";

import {
	MDBBtn,
	MDBCol,
	MDBIcon,
	MDBInput, MDBPopover, MDBPopoverBody, MDBPopoverHeader, MDBRow
} from "mdbreact";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";

library.add(fab, fas)

interface Props {
	onChange: (icon: any) => void;
	icon: IconDefinition | null;
}

interface State {
	isOpen: boolean;
	pickedIcon: IconDefinition;
	search: string;
}

export class MDBIconPicker extends Component<Props, State> {
	private icons = {...fab, ...fas};

	constructor(props: Props) {
		super(props);
		this.state = {
			isOpen: false,
			search: "",
			pickedIcon: props.icon || this.icons[
				Object.keys(this.icons)[
					Math.round(
						Math.random() * Object.keys(this.icons).length)
					]
				]
		};
	}

	toggle = () => {
		this.setState((prevState:State) => ({
			isOpen: !prevState.isOpen
		}));
	}

	pickIconHandler = (icon: IconDefinition) => {
		this.setState({pickedIcon: icon});

		this.props.onChange(icon);
	}

	searchIconHandler = (event: any) => {
		event.preventDefault();
		this.setState({search: event.target.value});
	}

	render() {
		const iconList = Object.keys(this.icons)
			.filter(key => this.icons[key].iconName.includes(this.state.search))
			.map((key, idx) => {
					const icon = this.icons[key];
					return (
						<MDBCol key={`iconPicker-${idx}`} sm='3'>
							<MDBBtn
								color='primary'
								className="p-1"
								onClick={() => this.pickIconHandler(icon)}
							>
								<MDBIcon icon={icon.iconName} fab={icon.prefix === "fab"} size='2x'/>
							</MDBBtn>
						</MDBCol>)
				}
			)
		return (
			<div style={{ display: "flex" }} className="m-5 p-5">
				<MDBPopover
					placement="bottom"
					popover
					clickable
					className="py-0 my-0"
				>
					<MDBBtn color='primary' outline className="m-0 p-0">
						<FontAwesomeIcon icon={[this.state.pickedIcon.prefix, this.state.pickedIcon.iconName]}/>
					</MDBBtn>
					<div>
						<MDBPopoverHeader>
							<MDBInput
								type="text"
								label="Hledej"
								className="my-0"
								value={this.state.search}
								onChange={this.searchIconHandler}/>
						</MDBPopoverHeader>
						<MDBPopoverBody >
							<MDBRow style={{overflowX:'hidden', overflowY:'scroll', height:'200px'}}>
								{iconList}
							</MDBRow>
						</MDBPopoverBody>
					</div>
				</MDBPopover>
			</div>
		)
	}
}