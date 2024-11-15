import { Box } from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import Button from "@mui/material/Button";
import { useGlobals } from "../../hooks/useGlobals";
import { useState } from "react";
import { MemberInput, MemberUpdateInput } from "../../../lib/data/types/member";
import { T } from "../../../lib/data/types/common";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/data/sweetAlert";
import { Messages, serverApi } from "../../../lib/data/config";
import MemberService from "../../services/MemberService";

export function Settings() {
  const {authMember, setAuthMember} = useGlobals();
  const [memberImage, setmemberImage] = useState<string>(authMember?.memberImage ? `${serverApi}/${authMember.memberImage}`: "/icons/default-user.svg" )
  const [memberUpdateInput, setMemberUpdateInput] = useState<MemberUpdateInput>({
    memberNick: authMember?.memberNick,
    memberPhone: authMember?.memberPhone,
    memberAddress: authMember?.memberAddress,
    memberDesc: authMember?.memberDesc,
    memberImage: authMember?.memberImage
  });

  //Handlers
  const memberNickHandler = (e:T) => {
    memberUpdateInput.memberNick = e.target.value
    setMemberUpdateInput({...memberUpdateInput})
  }

  const memberPhoneHandler = (e:T) => {
    memberUpdateInput.memberPhone = e.target.value
    setMemberUpdateInput({...memberUpdateInput})
  }

  const memberAddressHandler = (e:T) => {
    memberUpdateInput.memberAddress = e.target.value
    setMemberUpdateInput({...memberUpdateInput})
  }

  const memberDescHandler = (e:T) => {
    memberUpdateInput.memberDesc = e.target.value
    setMemberUpdateInput({...memberUpdateInput})
  }

    const memberImageHandler = (e:T) => {
      const file = e.target.files[0];
      const fileTypes = file.type,
      validateFileType = ["image/jpg","image/jpeg", "image/png" ]

      if(!validateFileType.includes(fileTypes)){
        sweetErrorHandling(Messages.error5);
      } else {
        if(file) {
          memberUpdateInput.memberImage = file;
          setMemberUpdateInput({...memberUpdateInput})
          setmemberImage(URL.createObjectURL(file))
        }
      }
      

    }

  const handlerSubmitButton = async () => {
    try{
    if(!authMember) throw new Error(Messages.error2)
    const member = new MemberService()
    const result = await member.updateMember(memberUpdateInput)
    setAuthMember(result)

    await sweetTopSmallSuccessAlert("Modified Successfully", 700)
      if(
        memberUpdateInput.memberAddress === "" 
        || memberUpdateInput.memberDesc === "" 
        || memberUpdateInput.memberNick === "" 
        || memberUpdateInput.memberPhone === "") {
          throw new Error(Messages.error3)
        }
    } catch(err) {
      console.log(err)
      sweetErrorHandling(err).then()
    }
  }


  return (
    <Box className={"settings"}>
      <Box className={"member-media-frame"}>
        <img src={memberImage} className={"mb-image"} />
        <div className={"media-change-box"}>
          <span>Upload image</span>
          <p>JPG, JPEG, PNG formats only!</p>
          <div className={"up-del-box"}>
            <Button component="label" onChange={memberImageHandler}>
              <CloudDownloadIcon />
              <input type="file" hidden />
            </Button>
          </div>
        </div>
      </Box>
      <Box className={"input-frame"}>
        <div className={"long-input"}>
          <label className={"spec-label"}>Username</label>
          <input
            className={"spec-input mb-nick"}
            type="text"
            placeholder={authMember?.memberNick}
            value={memberUpdateInput.memberNick}
            name="memberNick"
            onChange={memberNickHandler}
          />
        </div>
      </Box>
      <Box className={"input-frame"}>
        <div className={"short-input"}>
          <label className={"spec-label"}>Phone</label>
          <input
            className={"spec-input mb-phone"}
            type="text"
            placeholder={authMember?.memberPhone ?? "no phone"}
            value={memberUpdateInput.memberPhone}
            name="memberPhone"
            onChange={memberPhoneHandler}
          />
        </div>
        <div className={"short-input"}>
          <label className={"spec-label"}>Address</label>
          <input
            className={"spec-input  mb-address"}
            type="text"
            placeholder={authMember?.memberAddress ? authMember.memberAddress : "no address"}
            value={memberUpdateInput.memberAddress}
            name="memberAddress"
            onChange={memberAddressHandler}
          />
        </div>
      </Box>
      <Box className={"input-frame"}>
        <div className={"long-input"}>
          <label className={"spec-label"}>Description</label>
          <textarea
            className={"spec-textarea mb-description"}
            placeholder={authMember?.memberDesc ? authMember.memberDesc : "no description"}
            value={memberUpdateInput.memberDesc}
            name="memberDesc"
            onChange={memberDescHandler}
          />
        </div>
      </Box>
      <Box className={"save-box"}>
        <Button variant={"contained"} onClick={handlerSubmitButton}>Save</Button>
      </Box>
    </Box>
  );
}
