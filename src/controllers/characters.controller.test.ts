// Import { NextFunction, Request, Response } from 'express';
// import { CharactersFileRepo } from '../repo/characters.file.repo';
// import { CharactersController } from './characters.controller';
// import { Characters } from '../entities/character';

// describe('Given CharactersController class', () => {
//   describe('When calling getAll', () => {
//     test('Then it should return the list of characters', async () => {
//       const mockCharacters: Characters[] = [
//         {
//           id: '1',
//           name: 'Character 1',
//           surname: 'Surname 1',
//           power: 'Power 1',
//           class: 'Class 1',
//         },
//         {
//           id: '2',
//           name: 'Character 2',
//           surname: 'Surname 2',
//           power: 'Power 2',
//           class: 'Class 2',
//         },
//       ];
//       const repoMock = jest
//         .spyOn(CharactersFileRepo.prototype, 'getAll')
//         .mockResolvedValue(mockCharacters);
//       const controller = new CharactersController();
//       const mockResponse: Partial<Response> = {
//         json: jest.fn(),
//       };
//       await controller.getAll({} as Request, mockResponse as Response);
//       expect(repoMock).toHaveBeenCalled();
//       expect(mockResponse.json).toHaveBeenCalledWith(mockCharacters);
//     });
//   });

//   describe('When calling getById', () => {
//     test('Then it should return the hobby with the specified ID', async () => {
//       const mockCharacter: Characters = {id: '1', name:'character 1', surname:'surname 1', power:'power 1', class:'class 1'}
//       const repoMock = jest
//         .spyOn(CharactersFileRepo.prototype, 'getById')
//         .mockResolvedValue(mockCharacter);
//       const controller = new CharactersController();
//       const mockRequest: Partial<Request> = {
//         params: { id: '1' },
//       };

//       const mockResponse: Partial<Response> = {
//         json: jest.fn(),
//       };

//       await controller.getById(
//         mockRequest as Request,
//         mockResponse as Response,
//         jest.fn()
//       );
//       expect(repoMock).toHaveBeenCalledWith('1');
//       expect(mockResponse.json).toHaveBeenCalledWith(mockCharacter);
//     });

//     test('Then it should handle errors and call the next function', async () => {
//       const repoMock = jest
//         .spyOn(CharactersFileRepo.prototype, 'getById')
//         .mockRejectedValue(new Error('Test error'));
//       const controller = new CharactersController();
//       const mockRequest: Partial<Request> = {
//         params: { id: '1' },
//       };

//       const mockResponse: Partial<Response> = {
//         json: jest.fn(),
//       };

//       const mockNext = jest.fn();
//       await controller.getById(
//         mockRequest as Request,
//         mockResponse as Response,
//         mockNext
//       );
//       expect(repoMock).toHaveBeenCalledWith('1');
//       expect(mockNext).toHaveBeenCalled();
//     });
//   });

//   describe('When calling create', () => {
//     test('Then it should create a new character and return 201 status with the correct data', async () => {
//       const mockNewCharacter: Omit<Characters, 'id'> = {
//       const mockCreatedCharacter: Character = { ...mockNewCharacter, id: '1' };
//       const repoMock = jest.spyOn(CharactersFileRepo.prototype, 'create').mockResolvedValue(mockCreatedCharacter);
//         .spyOn(CharactersFileRepo.prototype, 'create')
//         .mockResolvedValue(mockCreatedCharacter);
//       const controller = new CharactersController();
//       const mockRequest: Partial<Request> = {
//         body: mockNewCharacter,
//       };

//       const mockResponse: Partial<Response> = {
//         status: jest.fn().mockReturnThis(),
//         statusMessage: '',
//         json: jest.fn(),
//       };

//       await controller.create(mockRequest as Request, mockResponse as Response);
//       expect(repoMock).toHaveBeenCalledWith(mockNewCharacter);
//       expect(mockResponse.status).toHaveBeenCalledWith(201);
//       expect(mockResponse.statusMessage).toBe('Created');
//       expect(mockResponse.json).toHaveBeenCalledWith(mockNewCharacter);
//     });

//     describe('When update method should update a hobbie and return the updated data', () => {
//       test('Then a valid ID and request body are provided', async () => {
//         const mockId = '123';
//         const mockRequestBody = {
//           name: 'Updated Character',
//           surname: 'Updated Surname',
//           power: 'Updated Power',
//           class: 'Updated Class',
//         };
//         const mockUpdatedResult = {
//           id: '123',
//           name: 'Updated Character',
//           surname: 'Updated Surname',
//           power: 'Updated Power',
//           class: 'Updated Class',
//         };

//         const charactersFileRepoMock = jest
//           .spyOn(CharactersFileRepo.prototype, 'update')
//           .mockResolvedValue(mockUpdatedResult);
//         const controller = new CharactersController();
//         const mockRequest: Request = {
//           params: { id: mockId },
//           body: mockRequestBody,
//         } as unknown as Request;

//         const mockResponse: Response = {
//           json: jest.fn(),
//         } as unknown as Response;

//         const mockNext: NextFunction = jest.fn();
//         await controller.update(mockRequest, mockResponse);
//         expect(charactersFileRepoMock).toHaveBeenCalledWith(
//           mockId,
//           mockRequestBody
//         );
//         expect(mockResponse.json).toHaveBeenCalledWith(mockUpdatedResult);
//         expect(mockNext).not.toHaveBeenCalled();
//       });
//     });
//   });

//   describe('Then delete method should delete a hobbie and return 204 status', () => {
//     test('When a valid ID is provided', async () => {
//       const mockId = '123';
//       const charactersFileRepoMock = jest
//         .spyOn(CharactersFileRepo.prototype, 'delete')
//         .mockResolvedValue(undefined);
//       const controller = new CharactersController();
//       const mockRequest: Request = {
//         params: { id: mockId },
//       } as unknown as Request;

//       const mockResponse: Response = {
//         status: jest.fn().mockReturnThis(),
//         json: jest.fn(),
//       } as unknown as Response;

//       const mockNext: NextFunction = jest.fn();
//       await controller.delete(mockRequest, mockResponse, mockNext);
//       expect(charactersFileRepoMock).toHaveBeenCalledWith(mockId);
//       expect(mockResponse.status).toHaveBeenCalledWith(204);
//       expect(mockResponse.json).toHaveBeenCalledWith({});
//       expect(mockNext).not.toHaveBeenCalled();
//     });

//     test('When an invalid ID is provided', async () => {
//       const mockId = 'invalid_id';
//       const mockError = new Error('Invalid ID');
//       const CharactersFileRepoMock = jest
//         .spyOn(CharactersFileRepo.prototype, 'delete')
//         .mockRejectedValue(mockError);
//       const controller = new CharactersController();
//       const mockRequest: Request = {
//         params: { id: mockId },
//       } as unknown as Request;

//       const mockResponse: Response = {
//         status: jest.fn().mockReturnThis(),
//         json: jest.fn(),
//       } as unknown as Response;

//       // const mockNext: NextFunction = jest.fn();
//       await controller.delete(mockRequest, mockResponse, mockNext);
//       expect(CharactersFileRepoMock).toHaveBeenCalledWith(mockId);
//       expect(mockResponse.status).not.toHaveBeenCalled();
//       expect(mockResponse.json).not.toHaveBeenCalled();
//       expect(mockNext).toHaveBeenCalledWith(mockError);
//     });
//   });
// });
