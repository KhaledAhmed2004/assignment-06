import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Modal,
  Input,
  Select,
  Button as AntButton,
  Form,
  Typography,
} from "antd";
import { RxCross2 } from "react-icons/rx";
import { useCreateUser } from "../../hooks/users/useCreateUser";
import { useUpdateUser } from "../../hooks/users/useUpdateUser";
import { User } from "@/app/dashboard/admin/manage-users/page";
const { Text } = Typography;
const { Option } = Select;

interface UserModalProps {
  modalIsOpen: boolean;
  setModalIsOpen: (value: boolean) => void;
  user: User | null; // Allow user to be null
}

interface FormData {
  name: string;
  email: string;
  role: "user" | "admin";
  password: string;
  isBlocked?: "blocked" | "unblocked" | boolean;
  phone?: string;
  address?: string;
}

const UserModal: React.FC<UserModalProps> = ({
  modalIsOpen,
  setModalIsOpen,
  user,
}) => {
  const { updateUser, isPending: isUpdating } = useUpdateUser();
  const { createUser, isPending: isCreating } = useCreateUser();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    clearErrors,
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      role: "user",
      password: "",
      phone: "",
      address: "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        address: user.address,
        isBlocked: user.isBlocked ? "blocked" : "unblocked",
      });
    } else {
      reset({
        name: "",
        email: "",
        role: "user",
        password: "",
        phone: "",
        address: "",
      });
    }
  }, [user, reset]);

  const onSubmit = (newUser: FormData) => {
    clearErrors();
    if (user) {
      newUser.isBlocked = newUser.isBlocked === "blocked";
      updateUser({ newUser, userId: user?._id });
    } else {
      createUser(newUser);
    }
    setModalIsOpen(false);
  };

  return (
    <Modal
      title={user ? "Edit User" : "Add New User"}
      open={modalIsOpen}
      onCancel={() => setModalIsOpen(false)}
      footer={null}
      closeIcon={<RxCross2 />}
      centered
    >
      <Form
        layout="vertical"
        onFinish={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <Form.Item label="Name" required>
          <Controller
            name="name"
            control={control}
            rules={{ required: "Name is required" }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Enter user name"
                status={errors.name ? "error" : ""}
                autoComplete="off"
              />
            )}
          />
          {errors.name && <Text type="danger">{errors.name.message}</Text>}
        </Form.Item>

        <Form.Item label="Email" required>
          <Controller
            name="email"
            control={control}
            rules={{ required: "Email is required" }}
            render={({ field }) => (
              <Input
                {...field}
                type="email"
                placeholder="Enter user email"
                status={errors.email ? "error" : ""}
                autoComplete="off"
              />
            )}
          />
          {errors.email && <Text type="danger">{errors.email.message}</Text>}
        </Form.Item>

        <Form.Item label="Role" required>
          <Controller
            name="role"
            control={control}
            rules={{ required: "Role is required" }}
            render={({ field }) => (
              <Select {...field} defaultValue="user">
                <Option value="user">User</Option>
                <Option value="admin">Admin</Option>
              </Select>
            )}
          />
          {errors.role && <Text type="danger">{errors.role.message}</Text>}
        </Form.Item>

        {user ? (
          <Form.Item label="Block Status" required>
            <Controller
              name="isBlocked"
              control={control}
              rules={{ required: "Block status is required" }}
              render={({ field }) => (
                <Select {...field} defaultValue="unblocked">
                  <Option value="blocked">Blocked</Option>
                  <Option value="unblocked">Unblocked</Option>
                </Select>
              )}
            />
            {errors.isBlocked && (
              <Text type="danger">{errors.isBlocked.message}</Text>
            )}
          </Form.Item>
        ) : (
          <Form.Item label="Password" required>
            <Controller
              name="password"
              control={control}
              rules={{ required: "Password is required for new users" }}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  placeholder="Enter user password"
                  status={errors.password ? "error" : ""}
                  autoComplete="new-password"
                />
              )}
            />
            {errors.password && (
              <Text type="danger">{errors.password.message}</Text>
            )}
          </Form.Item>
        )}

        <Form.Item label="Phone">
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="tel"
                placeholder="Enter user phone number"
                autoComplete="off"
              />
            )}
          />
        </Form.Item>

        <Form.Item label="Address">
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <Input.TextArea
                {...field}
                placeholder="Enter user address"
                rows={3}
                autoComplete="off"
              />
            )}
          />
        </Form.Item>

        <Form.Item>
          <AntButton
            type="primary"
            htmlType="submit"
            loading={isUpdating || isCreating}
            block
          >
            {user ? "Update User" : "Add User"}
          </AntButton>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserModal;
