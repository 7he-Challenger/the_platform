import { getSession } from "next-auth/react";
import React from "react";
import { Button } from "react-bootstrap";
import { useFormData } from "~logics/useFormData";
import { updateOneUser } from "~repositories/user";
import { useAppDispatch } from "~store/hooks";
import { setLoadingTreatment } from "~store/loading-overlay";
import { setToast } from "~store/toast";
import { PasswordField } from "./PasswordField";

export const EditPasswordForm = ({ onClose }: { onClose?: () => void }) => {
  const { formData, getTextFieldProps, isValid } = useFormData({
    formData: {
      actualPassword: "",
      newPassword: "",
      newPasswordConfirm: "",
    },
    required: ["actualPassword", "newPassword", "newPasswordConfirm"],
    validate(name, value, formData){
        if (name === 'newPasswordConfirm' && value !== formData?.newPassword) {
            return "Les mots de passe ne correspondent pas"
        }
    }
  });

  const dispatch = useAppDispatch();
  const handleUpdate = async () => {
    if (await isValid()) {
        dispatch(setLoadingTreatment(true));
        try {
            const session: any = await getSession();

            const result = await updateOneUser(
            session.accessToken,
            session?.user?.id,
            { password: formData.newPassword }
            );
            if (result.status === 200) {
            onClose?.();
            dispatch(
                setToast({
                show: true,
                message: "Votre mot de Passe a été modifié",
                })
            );
            }
        } catch (error) {
            console.log("Error Occured :", error);
        } finally {
            dispatch(setLoadingTreatment(false));
        }
        }
  };

  return (
    <div>
      <PasswordField
        label="Votre ancien mot de passe"
        inputProps={{ ...getTextFieldProps("actualPassword") }}
      />
      <PasswordField
        label="Le nouveau mot de passe"
        inputProps={{ ...getTextFieldProps("newPassword") }}
      />
      <PasswordField
        label="Confirmez le nouveau mot de passe"
        inputProps={{ ...getTextFieldProps("newPasswordConfirm") }}
      />
      <div className="d-flex justify-content-end" style={{ columnGap: "10px" }}>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" onClick={() => onClose?.()}>
            Annuler
          </Button>
        </div>
        <div className="d-flex justify-content-end">
          <Button variant="primary" onClick={handleUpdate}>
            Modifier
          </Button>
        </div>
      </div>
    </div>
  );
};
